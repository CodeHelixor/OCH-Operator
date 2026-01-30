package number.msisdn.backend.database.entities;
import jakarta.persistence.*;

@Entity
@Table(name="notifytable")
public class NotifyEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String notify;
    private String userId;
    private String notifyType;  //Error or Success

    //Constructors, Getters, Setters,
    public NotifyEntity(){}
    public NotifyEntity(String notify, String userId){
        this.notify = notify;
        this.userId = userId;
    }

    public long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getNotify(){
        return notify;
    }
    public void setNotify(String notify){
        this.notify = notify;
    }

    public String getUserId(){
        return userId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }

    public String getNotifyType(){
        return notifyType;
    }
    public void setNotifyType(String notifyType){
        this.notifyType = notifyType;
    }
}