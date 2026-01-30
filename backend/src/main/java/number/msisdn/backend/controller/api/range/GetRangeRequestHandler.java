package number.msisdn.backend.controller.api.range;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.IchRangeEntity;
import number.msisdn.backend.database.repositories.IchRangeRepository;

@Service
public class GetRangeRequestHandler {
    private IchRangeRepository ichRangeRepository;
    public GetRangeRequestHandler(IchRangeRepository ichRangeRepository){
        this.ichRangeRepository = ichRangeRepository;
    }

    public List<IchRangeEntity> handle(){
        return ichRangeRepository.findOpenRangesOrderByRangeStartAsNumber();
    }
    
}
