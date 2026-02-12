package number.msisdn.backend.general;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Error;
import number.msisdn.soapclient.Reject;
import number.msisdn.soapclient.Transaction;

/**
 * Utility class for logging OCH responses and requests to the backend console.
 * Provides comprehensive logging of Batch and Transaction data.
 */
public class OCHResponseLogger {
    
    private static final String SEPARATOR = "========================================";
    
    /**
     * Logs a complete Batch received from OCH
     */
    public static void logReceivedBatch(Batch batch) {
        if (batch == null) {
            System.out.println(SEPARATOR);
            System.out.println("OCH RECEIVED BATCH: NULL");
            System.out.println(SEPARATOR);
            return;
        }
        
        System.out.println("\n" + SEPARATOR);
        System.out.println("OCH RECEIVED BATCH - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        System.out.println(SEPARATOR);
        System.out.println("Batch ID: " + batch.getId());
        System.out.println("Number of Transactions: " + (batch.getTransactions() != null ? batch.getTransactions().size() : 0));
        System.out.println(SEPARATOR);
        
        if (batch.getTransactions() != null && !batch.getTransactions().isEmpty()) {
            for (int i = 0; i < batch.getTransactions().size(); i++) {
                System.out.println("\n--- Transaction #" + (i + 1) + " ---");
                logTransaction(batch.getTransactions().get(i));
            }
        }
        
        System.out.println("\n" + SEPARATOR + "\n");
    }
    
    /**
     * Logs a Batch being sent to OCH
     */
    public static void logSentBatch(Batch batch, String operation) {
        if (batch == null) {
            System.out.println(SEPARATOR);
            System.out.println("OCH SENT BATCH (" + operation + "): NULL");
            System.out.println(SEPARATOR);
            return;
        }
        
        System.out.println("\n" + SEPARATOR);
        System.out.println("OCH SENT BATCH (" + operation + ") - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        System.out.println(SEPARATOR);
        System.out.println("Batch ID: " + batch.getId());
        System.out.println("Number of Transactions: " + (batch.getTransactions() != null ? batch.getTransactions().size() : 0));
        System.out.println(SEPARATOR);
        
        if (batch.getTransactions() != null && !batch.getTransactions().isEmpty()) {
            for (int i = 0; i < batch.getTransactions().size(); i++) {
                System.out.println("\n--- Transaction #" + (i + 1) + " ---");
                logTransaction(batch.getTransactions().get(i));
            }
        }
        
        System.out.println("\n" + SEPARATOR + "\n");
    }
    
    /**
     * Logs the result of a send/confirm operation
     */
    public static void logOperationResult(String operation, boolean result) {
        System.out.println(SEPARATOR);
        System.out.println("OCH " + operation + " RESULT: " + (result ? "SUCCESS" : "FAILED"));
        System.out.println(SEPARATOR + "\n");
    }
    
    /**
     * Logs a complete Transaction with all its fields
     */
    public static void logTransaction(Transaction tx) {
        if (tx == null) {
            System.out.println("Transaction: NULL");
            return;
        }
        
        System.out.println("Transaction Type: " + safeString(tx.getTransactionType()));
        System.out.println("Telephone Number: " + safeString(tx.getTelephoneNumber()));
        System.out.println("OCH Order Number: " + safeString(tx.getOchOrderNumber()));
        System.out.println("Unique ID: " + safeString(tx.getUniqueId()));
        System.out.println("Originating Order Number: " + safeString(tx.getOriginatingOrderNumber()));
        System.out.println("Priority: " + tx.getPriority());
        
        // Network/Service Operators
        System.out.println("Current Network Operator: " + safeString(tx.getCurrentNetworkOperator()));
        System.out.println("Current Service Operator: " + safeString(tx.getCurrentServiceOperator()));
        System.out.println("Recipient Network Operator: " + safeString(tx.getRecipientNetworkOperator()));
        System.out.println("Recipient Service Operator: " + safeString(tx.getRecipientServiceOperator()));
        System.out.println("Other Operator: " + safeString(tx.getOtherOperator()));
        
        // Number Type
        System.out.println("Current Number Type: " + safeString(tx.getCurrentNumberType()));
        System.out.println("New Number Type: " + safeString(tx.getNewNumberType()));
        System.out.println("Number Ported: " + safeString(tx.getNumberPorted()));
        
        // Dates
        System.out.println("Requested Execution Date: " + safeString(tx.getRequestedExecutionDate()));
        System.out.println("Requested Execution Time: " + safeString(tx.getRequestedExecutionTime()));
        System.out.println("Confirmed Execution Date: " + safeString(tx.getConfirmedExecutionDate()));
        System.out.println("Confirmed Execution Time: " + safeString(tx.getConfirmedExecutionTime()));
        
        // Confirmation Status
        if (tx.getConfirmationStatus() != null) {
            System.out.println("Confirmation Status: " + tx.getConfirmationStatus());
        }
        
        // Range Information
        System.out.println("Range Start: " + safeString(tx.getRangeStart()));
        System.out.println("Range End: " + safeString(tx.getRangeEnd()));
        System.out.println("Range Update Type: " + safeString(tx.getRangeUpdateType()));
        System.out.println("Current Range Holder: " + safeString(tx.getCurrentRangeHolder()));
        
        // Porting Information
        System.out.println("Porting Case: " + safeString(tx.getPortingCase()));
        System.out.println("Porting Type: " + safeString(tx.getPortingType()));
        System.out.println("Point of Connection: " + safeString(tx.getPointOfConnection()));
        
        // Location Information
        System.out.println("SPC: " + safeString(tx.getSpc()));
        System.out.println("Municipality: " + safeString(tx.getMunicipality()));
        System.out.println("Routing Info: " + safeString(tx.getRoutingInfo()));
        System.out.println("Charging Info: " + safeString(tx.getChargingInfo()));
        
        // Customer Information
        System.out.println("Customer ID: " + safeString(tx.getCustomerId()));
        System.out.println("Customer First Name: " + safeString(tx.getCustomerFirstName()));
        System.out.println("Customer Last Name: " + safeString(tx.getCustomerLastName()));
        System.out.println("Customer Street Name: " + safeString(tx.getCustomerStreetName()));
        System.out.println("Customer Street Number: " + safeString(tx.getCustomerStreetNumber()));
        System.out.println("Customer Postal Code: " + safeString(tx.getCustomerPostalCode()));
        System.out.println("Customer City: " + safeString(tx.getCustomerCity()));
        
        // Other fields
        System.out.println("ICC: " + safeString(tx.getIcc()));
        if (tx.getDirectoryInfo() != null) {
            System.out.println("Directory Info: " + tx.getDirectoryInfo());
        }
        
        // Errors
        if (tx.getErrors() != null && !tx.getErrors().isEmpty()) {
            System.out.println("\n--- ERRORS (" + tx.getErrors().size() + ") ---");
            for (int i = 0; i < tx.getErrors().size(); i++) {
                Error error = tx.getErrors().get(i);
                System.out.println("  Error #" + (i + 1) + ":");
                System.out.println("    Code: " + String.valueOf(error.getCode()));
                System.out.println("    Text: " + safeString(error.getText()));
            }
        }
        
        // Rejects
        if (tx.getRejects() != null && !tx.getRejects().isEmpty()) {
            System.out.println("\n--- REJECTS (" + tx.getRejects().size() + ") ---");
            for (int i = 0; i < tx.getRejects().size(); i++) {
                Reject reject = tx.getRejects().get(i);
                System.out.println("  Reject #" + (i + 1) + ":");
                System.out.println("    Code: " + String.valueOf(reject.getCode()));
                System.out.println("    Text: " + safeString(reject.getText()));
            }
        }
        
        // Comments
        if (tx.getComments() != null && !tx.getComments().isEmpty()) {
            System.out.println("\n--- COMMENTS (" + tx.getComments().size() + ") ---");
            for (int i = 0; i < tx.getComments().size(); i++) {
                System.out.println("  Comment #" + (i + 1) + ": " + safeString(tx.getComments().get(i).getText()));
            }
        }
        
        // Series
        if (tx.getSeries() != null && !tx.getSeries().isEmpty()) {
            System.out.println("\n--- SERIES (" + tx.getSeries().size() + ") ---");
            for (int i = 0; i < tx.getSeries().size(); i++) {
                number.msisdn.soapclient.Series series = tx.getSeries().get(i);
                System.out.println("  Series #" + (i + 1) + ": Start=" + safeString(series.getStart()) + ", End=" + safeString(series.getEnd()));
            }
        }
    }
    
    /**
     * Logs an exception that occurred during OCH operation
     */
    public static void logException(String operation, Exception e) {
        System.out.println("\n" + SEPARATOR);
        System.out.println("OCH " + operation + " EXCEPTION - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        System.out.println(SEPARATOR);
        System.out.println("Exception Type: " + e.getClass().getName());
        System.out.println("Message: " + (e.getMessage() != null ? e.getMessage() : "No message"));
        System.out.println("Stack Trace:");
        e.printStackTrace();
        System.out.println(SEPARATOR + "\n");
    }
    
    /**
     * Helper method to safely convert String to display format
     */
    private static String safeString(String value) {
        return value != null ? value : "(null)";
    }
}
