package number.msisdn.backend.general;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import number.msisdn.backend.database.entities.ConfirmationStatusEntity;
import number.msisdn.backend.database.entities.ErrorEntity;
import number.msisdn.backend.database.entities.NotifyEntity;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.entities.RangeEntity;
import number.msisdn.backend.database.entities.StatusEntity;
import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.ConfirmationStatusRepository;
import number.msisdn.backend.database.repositories.ErrorRepository;
import number.msisdn.backend.database.repositories.NotifyRepository;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.database.repositories.RangeRepository;
import number.msisdn.backend.database.repositories.StatusRepository;
import number.msisdn.backend.database.repositories.TasklistRepository;
import number.msisdn.backend.general.OCHResponseLogger;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Error;
import number.msisdn.soapclient.Transaction;

@Component
public class RepeatedlyReadFromOCH {
    @Autowired
    private OCHAuthValidator ochAuthValidator;
    @Autowired
    private SoapClient soapClient;

    private BatchIdIO batchIdIO;
    private  NumberRepository numberRepository;
    private StatusRepository statusRepository;
    private TasklistRepository tasklistRepository;
    private RangeRepository rangeRepository;
    private ErrorRepository errorRepository;
    private ConfirmationStatusRepository confirmationStatusRepository;
    private NotifyRepository notifyRepository;
    private RangeManage rangeManage;
    public RepeatedlyReadFromOCH(BatchIdIO batchIdIO, NumberRepository numberRepository,ConfirmationStatusRepository confirmationStatusRepository, StatusRepository statusRepository, TasklistRepository tasklistRepository, ErrorRepository errorRepository, RangeRepository rangeRepository, NotifyRepository notifyRepository, RangeManage rangeManage){
        this.batchIdIO = batchIdIO;
        this.numberRepository = numberRepository;
        this.statusRepository = statusRepository;
        this.tasklistRepository = tasklistRepository;
        this.errorRepository = errorRepository;
        this.rangeRepository = rangeRepository;
        this.confirmationStatusRepository = confirmationStatusRepository;
        this.notifyRepository = notifyRepository;
        this.rangeManage = rangeManage;
    }

    @Scheduled(fixedRate = 10000)
    public void runEveryCertainTimes(){
        boolean isValid = ochAuthValidator.validate(AuthStore.getUsername(), AuthStore.getPassword());
        // System.out.println("============== 10 seconds passed =======================");
        if(isValid){
            boolean existingBatch = true;
            while(existingBatch){
                try {
                    Batch batch = soapClient.getPort().receive(0);
                    OCHResponseLogger.logReceivedBatch(batch);
                    persistReceivedBatchToTasklist(batch);
                    boolean confirmed = soapClient.getPort().confirm(batch.getId());
                    OCHResponseLogger.logOperationResult("CONFIRM (Batch ID: " + batch.getId() + ")", confirmed);
                    if(confirmed){
                        processBatch(batch);
                    }
                } catch (Exception e) {
                    OCHResponseLogger.logException("RECEIVE", e);
                    existingBatch = false;
                }
            }
        }
    }

    /**
     * Persists the received batch to tasklisttable (same data as logged to console).
     * Upserts by originatingOrderNumber so each transaction is stored/updated once.
     */
    private void persistReceivedBatchToTasklist(Batch batch) {
        List<Transaction> transactions = batch != null ? batch.getTransactions() : null;
        if (transactions == null || transactions.isEmpty()) return;
        for (Transaction tx : transactions) {
            if (tx == null || tx.getOriginatingOrderNumber() == null) continue;
            // 005 (NP Error): do not store/update tasklist; error is written to errortable only in processBatch
            String txType = tx.getTransactionType() != null ? tx.getTransactionType().trim() : null;
            if ("005".equals(txType)) continue;
            List<TasklistEntity> existing = tasklistRepository.findByOriginatingOrderNumber(tx.getOriginatingOrderNumber());
            TasklistEntity task = existing.isEmpty() ? new TasklistEntity() : existing.get(0);
            task.setTransactionType(tx.getTransactionType());
            task.setTelephoneNumber(tx.getTelephoneNumber());
            task.setOchOrderNumber(tx.getOchOrderNumber());
            task.setUniqueId(tx.getUniqueId());
            task.setOriginatingOrderNumber(tx.getOriginatingOrderNumber());
            task.setCurrentServiceOperator(tx.getCurrentServiceOperator());
            task.setCurrentNetworkOperator(tx.getCurrentNetworkOperator());
            task.setRecipientServiceOperator(tx.getRecipientServiceOperator());
            task.setRecipientNetworkOperator(tx.getRecipientNetworkOperator());
            task.setCurrentNumberType(tx.getCurrentNumberType());
            task.setRequestedExecutionDate(tx.getRequestedExecutionDate());
            task.setPointOfConnection(tx.getPointOfConnection());
            task.setConfirmedExecutionDate(tx.getConfirmedExecutionDate());
            if (tx.getConfirmationStatus() != null) {
                task.setConfirmationStatus(confirmationStatusRepository.findById(tx.getConfirmationStatus().longValue())
                        .orElse(null));
            } else {
                task.setConfirmationStatus(null);
            }
            if (existing.isEmpty()) {
                task.setIsCompleted(false);
            }
            tasklistRepository.save(task);
        }
    }

    public void processBatch(Batch batch){
        List<Transaction> transactions = batch.getTransactions();
        if (transactions == null) return;
        for(int i = 0; i < transactions.size(); i++){
            Transaction transaction = transactions.get(i);
            String transactionType = transaction.getTransactionType() != null ? transaction.getTransactionType().trim() : null;
            switch (transactionType != null ? transactionType : "") {
                case "001": //<NP Create> - tasklist already saved in persistReceivedBatchToTasklist
                    // Number: skip if already processed (idempotency) or if phone already exists for our operator
                    if (numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber()).isPresent()) {
                        break;
                    }
                    try {
                        String operator = FileUtility.readOperator();
                        List<NumberEntity> existingByPhone = numberRepository.findByTelephoneNumber(transaction.getTelephoneNumber());
                        boolean phoneAlreadyExists = existingByPhone != null && existingByPhone.stream()
                                .anyMatch(n -> operator.equals(n.getRecipientServiceOperator()) || operator.equals(n.getRecipientNetworkOperator()));
                        if (phoneAlreadyExists) {
                            break;
                        }
                    } catch (Exception e) {
                        // If operator read fails, proceed with number insert
                    }
                    NumberEntity numberEntity = new NumberEntity();
                    numberEntity.setTelephoneNumber(transaction.getTelephoneNumber());
                    numberEntity.setOchOrderNumber(transaction.getOchOrderNumber());
                    numberEntity.setUniqueId(transaction.getUniqueId());
                    numberEntity.setOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                    numberEntity.setCurrentServiceOperator(transaction.getCurrentServiceOperator());
                    numberEntity.setRecipientNetworkOperator(transaction.getRecipientNetworkOperator());
                    numberEntity.setRecipientServiceOperator(transaction.getRecipientServiceOperator());
                    numberEntity.setCurrentNumberType(transaction.getCurrentNumberType());
                    numberEntity.setRequestedExecutionDate(transaction.getRequestedExecutionDate());
                    numberEntity.setPointOfConnection(transaction.getPointOfConnection());
                    StatusEntity status1 = statusRepository.findById(1L)
                                            .orElseThrow(() -> new RuntimeException("Status not found"));
                    numberEntity.setStatus(status1);
                    numberEntity.setRegdate(LocalDate.now().toString());
                    numberRepository.save(numberEntity);
                    break;
                case "002":   //<NP OCH Order Number Response>   
                    //if it is generated from <NP Range Update>, update range table 
                    try {
                        Optional<RangeEntity> optionalEntity = rangeRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if(optionalEntity.isPresent()){
                            RangeEntity entity = optionalEntity.get();
                            entity.setOchOrderNumber(transaction.getOchOrderNumber());
                            entity.setUniqueId(transaction.getUniqueId());
                            entity.setIsCompleted(true);
                            entity.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")));
                            rangeRepository.save(entity);

                            NotifyEntity newNotifyEntity = new NotifyEntity();
                            newNotifyEntity.setUserId(entity.getUserId());
                            newNotifyEntity.setNotifyType("success");
                            newNotifyEntity.setNotify("The range is successfully changed.");
                            notifyRepository.save(newNotifyEntity);

                            String rangeUpdateType = entity.getRangeUpdateType();
                            if(rangeUpdateType.equals("D")) {
                                rangeManage.delete(entity);
                            }
                            else if(rangeUpdateType.equals("I")) rangeManage.insert(entity);
                            else if(rangeUpdateType.equals("U")) rangeManage.update(entity);
                            break;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }   
                    
                    // If it is generated from <NP Create> - tasklist already updated in persistReceivedBatchToTasklist
                    try {
                        Optional<NumberEntity> optionalEntity = numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if(optionalEntity.isPresent()){
                            NumberEntity entity = optionalEntity.get();
                            entity.setOchOrderNumber(transaction.getOchOrderNumber());
                            entity.setUniqueId(transaction.getUniqueId());
                            StatusEntity status2 = statusRepository.findById(1L)
                                            .orElseThrow(() -> new RuntimeException("Status not found"));
                            entity.setStatus(status2);
                            entity.setRegdate(LocalDate.now().toString());
                            numberRepository.save(entity);

                            NotifyEntity newNotifyEntity = new NotifyEntity();
                            newNotifyEntity.setUserId(entity.getUserId());
                            newNotifyEntity.setNotifyType("success");
                            newNotifyEntity.setNotify("NP Create request is successfully sent.");
                            notifyRepository.save(newNotifyEntity);
                            break;
                        }
                    } catch (Exception e) {
                        if (!OCHResponseLogger.REQUEST_RESPONSE_ONLY) System.err.println("error in adding to number entity");
                    }
                    break;
                case "004": //<NP confirmation> - tasklist already saved in persistReceivedBatchToTasklist
                    //If there is numberEntity, update uniqueid for cancel
                    try {
                        Optional<NumberEntity> optionalEntity = numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if(optionalEntity.isPresent()){
                            NumberEntity entity = optionalEntity.get();
                            entity.setUniqueId(transaction.getUniqueId());
                            numberRepository.save(entity);
                        }
                    } catch (Exception e) {
                        if (!OCHResponseLogger.REQUEST_RESPONSE_ONLY) System.err.println("error in adding to number entity");
                    }
                    break;
                case "005": //<NP Error>
                    Optional<ErrorEntity> optionalErrorEntity = errorRepository.findByUniqueId(transaction.getUniqueId());
                    if(optionalErrorEntity.isPresent()){
                        //if there is an error with same uniqueId
                        ErrorEntity errorEntity = optionalErrorEntity.get();                     
                        errorEntity.setErrors(transaction.getErrors());
                        errorEntity.setIsViewed(false);
                        errorEntity.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")));
                        errorRepository.save(errorEntity);

                        Optional<NumberEntity> optionalNumberEntity = numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if(optionalErrorEntity.isPresent()){
                            NumberEntity number_entity = optionalNumberEntity.get();
                            StatusEntity status = statusRepository.findById(1L)
                                                .orElseThrow(() -> new RuntimeException("Status not found"));
                            number_entity.setStatus(status);
                            numberRepository.save(number_entity);
                        }
                    }else{
                        ErrorEntity errorEntity = new ErrorEntity();
                        errorEntity.setOchOrderNumber(transaction.getOchOrderNumber());
                        errorEntity.setUniqueId(transaction.getUniqueId());
                        errorEntity.setOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        errorEntity.setIsViewed(false);
                        errorEntity.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")));
                        List<Error> errors = transaction.getErrors();
                        errorEntity.setErrors(errors);
                        try {
                            Optional<RangeEntity> optionalEntity = rangeRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                            if(optionalEntity.isPresent()){
                                RangeEntity entity = optionalEntity.get();
                                errorEntity.setTransactionType("NP Range Update");
                                errorEntity.setTelephoneNumber(entity.getRangeStart()+" - "+entity.getRangeEnd());
                                errorEntity.setUserId(entity.getUserId());

                                NotifyEntity newNotifyEntity = new NotifyEntity();
                                newNotifyEntity.setUserId(entity.getUserId());
                                newNotifyEntity.setNotifyType("error");
                                newNotifyEntity.setNotify("The range is not successfully changed.");
                                notifyRepository.save(newNotifyEntity);
                            }else{
                                Optional<NumberEntity> optionalNumberEntity = numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                                if(optionalNumberEntity.isPresent()){
                                    NumberEntity number_entity = optionalNumberEntity.get();
                                    if(number_entity.getStatus()==null){
                                        errorEntity.setTransactionType("NP Create");
                                        errorEntity.setUserId(number_entity.getUserId());

                                        NotifyEntity newNotifyEntity = new NotifyEntity();
                                        newNotifyEntity.setUserId(number_entity.getUserId());
                                        newNotifyEntity.setNotifyType("error");
                                        newNotifyEntity.setNotify("An error is occured in NP Create Request.");
                                        notifyRepository.save(newNotifyEntity);
                                    }else{//NP Completion
                                        errorEntity.setTransactionType("NP Completion");

                                        StatusEntity status = statusRepository.findById(1L)
                                                            .orElseThrow(() -> new RuntimeException("Status not found"));
                                        number_entity.setStatus(status);
                                        numberRepository.save(number_entity);

                                        NotifyEntity newNotifyEntity = new NotifyEntity();
                                        newNotifyEntity.setUserId(number_entity.getUserId());
                                        newNotifyEntity.setNotifyType("error");
                                        newNotifyEntity.setNotify("An error is occured in NP Completion Request.");
                                        notifyRepository.save(newNotifyEntity);
                                    }
                                    errorEntity.setTelephoneNumber(transaction.getTelephoneNumber());
                                    // errorEntity.setUserId(number_entity.getUserId());
                                }
                            }
                        }catch (Exception e) {
                            e.printStackTrace();
                        }   
                        errorRepository.save(errorEntity);
                    }

                    
                    try {
                        Optional<RangeEntity> optionalEntity = rangeRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if(optionalEntity.isPresent()){
                            RangeEntity entity = optionalEntity.get();
                            rangeRepository.delete(entity);
                            break;
                        }
                    } catch (Exception e) {
                        e.getStackTrace();
                    }     

                    try {
                        Optional<NumberEntity> optionalEntity = numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if(optionalEntity.isPresent()){
                            //in the case of error from NP Completion
                            
                            NumberEntity entity = optionalEntity.get();
                            if(entity.getStatus()==null){  //in the case of error from NP Completion, it doesn't go into this block
                              numberRepository.delete(entity);
                            }
                            break;
                        }
                    } catch (Exception e) {
                        e.getStackTrace();
                    }     
                    break; 
                case "007":
                    try {
                        Optional<NumberEntity> numberEntity1= numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if (numberEntity1.isPresent()) {
                            numberRepository.delete(numberEntity1.get());
                        }
                    } catch (Exception e) {
                        e.getStackTrace();
                    }
                    break;
                case "009":   //<NP Update>
                case "011":                    
                    try {
                        Batch newBatch = new Batch();
                        newBatch.setId(batchIdIO.getBatchId());                   
                        //Create one transaction
                        Transaction tx = new Transaction();
                        tx.setTransactionType("010"); // Typically "001" = Add/Port
                        tx.setTelephoneNumber(transaction.getTelephoneNumber());
                        tx.setOchOrderNumber(transaction.getOchOrderNumber());
                        tx.setUniqueId(transaction.getUniqueId());
                        tx.setOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        String operator = FileUtility.readOperator();
                        tx.setOtherOperator(operator);
                        tx.setPriority(2);
                        newBatch.getTransactions().add(tx);
                        OCHResponseLogger.logSentBatch(newBatch, "NP Update 010");
                        boolean result = soapClient.getPort().send(newBatch);
                        OCHResponseLogger.logOperationResult("SEND (NP Update 010)", result);
                        if(result){
                            batchIdIO.setBatchId(batchIdIO.getBatchId()+1);
                            Optional<NumberEntity> optionalNumberEntity = numberRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                            if(optionalNumberEntity.isPresent()){
                                NumberEntity entity = optionalNumberEntity.get();
                                StatusEntity status = statusRepository.findById(3L)
                                                    .orElseThrow(() -> new RuntimeException("Status not found"));
                                entity.setStatus(status);
                                numberRepository.save(entity);
                            }
                        }
                    } catch (Exception e) {
                    }     
                    break;
                case "010":   //<NP Update Complete>
                    try {
                        Optional<RangeEntity> optionalEntity = rangeRepository.findByOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        if(optionalEntity.isPresent()){
                            RangeEntity entity = optionalEntity.get();
                            entity.setIsCompleted(true);
                            entity.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")));
                            rangeRepository.save(entity);
                            break;
                        }
                    } catch (Exception e) {
                        break;
                    }     
                    break;
                case "014":   //<NP Range Update> -> respond with <NP Update Complete>
                case "015":
                    try {
                        Batch newBatch = new Batch();
                        newBatch.setId(batchIdIO.getBatchId());  
                        Transaction tx = new Transaction();
                        tx.setTransactionType("010");
                        tx.setTelephoneNumber(transaction.getRangeStart());
                        tx.setOchOrderNumber(transaction.getOchOrderNumber());
                        tx.setUniqueId(transaction.getUniqueId());
                        tx.setOriginatingOrderNumber(transaction.getOriginatingOrderNumber());
                        String operator = FileUtility.readOperator();
                        tx.setOtherOperator(operator);
                        tx.setPriority(2);
                        newBatch.getTransactions().add(tx);
                        OCHResponseLogger.logSentBatch(newBatch, "NP Range Update 010");
                        boolean result = soapClient.getPort().send(newBatch);
                        OCHResponseLogger.logOperationResult("SEND (NP Range Update 010)", result);
                        if(result){
                            batchIdIO.setBatchId(batchIdIO.getBatchId()+1);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
