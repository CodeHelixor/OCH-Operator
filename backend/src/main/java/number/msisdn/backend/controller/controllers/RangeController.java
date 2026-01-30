package number.msisdn.backend.controller.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import number.msisdn.backend.controller.api.range.GetRangeRequestHandler;
import number.msisdn.backend.controller.api.range.RangeChangeRequestHandler;
import number.msisdn.backend.controller.requests.RangeRequest;
import number.msisdn.backend.database.entities.IchRangeEntity;

@RestController
public class RangeController {
    private RangeChangeRequestHandler rangeChangeRequestHandler;
    private GetRangeRequestHandler getRangeRequestHandler;
    public RangeController(RangeChangeRequestHandler rangeChangeRequestHandler, GetRangeRequestHandler getRangeRequestHandler){
        this.rangeChangeRequestHandler = rangeChangeRequestHandler;
        this.getRangeRequestHandler = getRangeRequestHandler;
    }

    @PostMapping("/rangeChange")
    public boolean rangeChangeRequest(@RequestBody RangeRequest request){
        return rangeChangeRequestHandler.handle(request);
    }

    @PostMapping("/get/ranges")
    public List<IchRangeEntity> getRangeRequest() {
        return getRangeRequestHandler.handle();
    }
}
