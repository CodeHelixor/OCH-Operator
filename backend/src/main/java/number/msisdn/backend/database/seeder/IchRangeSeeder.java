package number.msisdn.backend.database.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import number.msisdn.backend.database.entities.IchRangeEntity;
import number.msisdn.backend.database.repositories.IchRangeRepository;

@Component
public class IchRangeSeeder {
    @Autowired
    private IchRangeRepository ichRangeRepository;

    @PostConstruct
    public void seedIchRange(){
        try {
            if(ichRangeRepository.count() == 0){
                ichRangeRepository.save(new IchRangeEntity("20990000", "20999999", "3 Nov 2025 08:53:25","01099", "01099", "01099", "01099", "GSM", "00", "000", "2099", "2099", "NonPorted","200000000683",""));
                ichRangeRepository.save(new IchRangeEntity("30980000", "30989999", "10 Oct 2025 05:19:51","01098", "01098", "01098", "01098","GSM", "00", "000", "3098", "3098", "NonPorted","200000000599",""));
                ichRangeRepository.save(new IchRangeEntity("40970000", "40989999", "7 Nov 2025 11:08:49","01097", "01097", "01097", "01097", "GSM", "00", "000", "4097", "4097", "NonPorted","200000000733",""));
                ichRangeRepository.save(new IchRangeEntity("79970000", "79979999", "1 Oct 2020 05:00:00","01097", "01097", "01097", "01097", "FIXED", "00", "000", "7997", "7997", "NonPorted","0",""));
                ichRangeRepository.save(new IchRangeEntity("89980000", "89989999", "1 Oct 2020 05:00:00","01098", "01098", "01098", "01098", "FIXED", "00", "000", "8998", "8998", "NonPorted","0",""));
                ichRangeRepository.save(new IchRangeEntity("98970000", "98979999", "1 Oct 2020 05:00:00","01097", "01097", "01097", "01097", "FIXED", "210368", "147", "00000000", "00000000", "NonPorted","0",""));
                ichRangeRepository.save(new IchRangeEntity("98980000", "98989999", "1 Oct 2020 05:00:00","01098", "01098", "01098", "01098", "FIXED", "210369", "151", "00000000", "00000000", "NonPorted","0",""));
                ichRangeRepository.save(new IchRangeEntity("98990000", "98999999", "1 Oct 2020 05:00:00","01099", "01099", "01099", "01099", "FIXED", "210370", "153", "00000000", "00000000", "NonPorted","0",""));
                ichRangeRepository.save(new IchRangeEntity("99990000", "99999999", "1 Oct 2020 05:00:00","01099", "01099", "01099", "01099", "FIXED", "00", "000", "9999", "9999", "NonPorted","0",""));
                // System.out.println("Seed Ich Range table.");
            }else {
                // System.out.println("ICH Range table already seeded.");
            }
        } catch (Exception e) {
            if (!number.msisdn.backend.general.OCHResponseLogger.REQUEST_RESPONSE_ONLY) {
                System.err.println("Error while seeding ICH range:");
                e.printStackTrace();
            }
            throw e; // rethrow to crash app (optional)
        }
    }
}



