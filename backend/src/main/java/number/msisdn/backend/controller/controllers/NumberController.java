package number.msisdn.backend.controller.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import number.msisdn.backend.controller.api.number.CancelRequestHandler;
import number.msisdn.backend.controller.api.number.CompletionRequestHandler;
import number.msisdn.backend.controller.api.number.ConfirmRequestHandler;
import number.msisdn.backend.controller.api.number.CreateRequestHandler;
import number.msisdn.backend.controller.api.number.DeleteNumberHandler;
import number.msisdn.backend.controller.api.number.GetNumberRequestHandler;
import number.msisdn.backend.controller.api.number.NpRejectRequestHandler;
import number.msisdn.backend.controller.api.number.ReturnRequestHandler;
import number.msisdn.backend.controller.requests.CancelRequest;
import number.msisdn.backend.controller.requests.CompleteRequest;
import number.msisdn.backend.controller.requests.ConfirmReqeust;
import number.msisdn.backend.controller.requests.CreateRequest;
import number.msisdn.backend.controller.requests.NpRejectRequest;
import number.msisdn.backend.controller.requests.ReturnRequest;
import number.msisdn.backend.controller.responses.CreateResponse;
import number.msisdn.backend.database.entities.NumberEntity;

@RestController
public class NumberController {
    private GetNumberRequestHandler getNumberRequestHandler;
    private CreateRequestHandler createRequestHandler;
    private CancelRequestHandler cancelRequestHandler;
    private ConfirmRequestHandler confirmRequestHandler;
    private CompletionRequestHandler completionRequestHandler;
    private NpRejectRequestHandler npRejectRequestHandler;
    private ReturnRequestHandler returnRequestHandler;
    private DeleteNumberHandler deleteNumberHandler;

    public NumberController(GetNumberRequestHandler getNumberRequestHandler, CreateRequestHandler createRequestHandler, CancelRequestHandler cancelRequestHandler, ConfirmRequestHandler confirmRequestHandler, CompletionRequestHandler completionRequestHandler, NpRejectRequestHandler npRejectRequestHandler, ReturnRequestHandler returnRequestHandler, DeleteNumberHandler deleteNumberHandler){
        this.getNumberRequestHandler = getNumberRequestHandler;
        this.createRequestHandler = createRequestHandler;
        this.cancelRequestHandler = cancelRequestHandler;
        this.confirmRequestHandler = confirmRequestHandler;
        this.completionRequestHandler = completionRequestHandler;
        this.npRejectRequestHandler = npRejectRequestHandler;
        this.returnRequestHandler = returnRequestHandler;
        this.deleteNumberHandler = deleteNumberHandler;
    }
    @PostMapping("/get/numbers")
    public List<NumberEntity>  handleGetAllRequest(){
        return getNumberRequestHandler.handle();
    }

    @PostMapping("/create")
    public ResponseEntity<CreateResponse> handleCreateRequest(@RequestBody CreateRequest request){
        CreateResponse response = createRequestHandler.handle(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cancel")
    public boolean handleDeleteRequest(@RequestBody CancelRequest request) {
        return cancelRequestHandler.handle(request);
    }

    @PostMapping("/reject")
    public boolean handleNpRejectRequest(@RequestBody NpRejectRequest request) {
        return npRejectRequestHandler.handle(request);
    }

    @PostMapping("/confirm/{originatingOrderNumber}")
    public boolean handleConfirmRequest(@PathVariable String originatingOrderNumber,  @RequestBody ConfirmReqeust request) {      
        return confirmRequestHandler.handle(originatingOrderNumber, request);
    }

    @PostMapping("/complete/{originatingOrderNumber}")
    public boolean handleCompletionRequest(@PathVariable String originatingOrderNumber,  @RequestBody CompleteRequest request) {      
        return completionRequestHandler.handle(originatingOrderNumber, request);
    }

    @PostMapping("/return/{originatingOrderNumber}")
    public boolean handleReturnRequest(@PathVariable String originatingOrderNumber, @RequestBody ReturnRequest request) {
        return returnRequestHandler.handle(originatingOrderNumber, request);
    }

    @PostMapping("/npreturn/{originatingOrderNumber}")
    public boolean handleNpReturnRequest(@PathVariable String originatingOrderNumber, @RequestBody ReturnRequest request) {
        return returnRequestHandler.handle(originatingOrderNumber, request);
    }

    @PostMapping("/deleteNumber/{id}")
    public ResponseEntity<Boolean> handleDeleteNumberRequest(@PathVariable Long id) {
        boolean deleted = deleteNumberHandler.handle(id);
        return ResponseEntity.ok(deleted);
    }
}
