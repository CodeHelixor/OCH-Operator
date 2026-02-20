package number.msisdn.backend.controller.requests;

import java.util.List;

/**
 * NPReturn (TransactionType 012) – To OCH: TelephoneNumber (M), OriginatingOrderNumber (M),
 * SeriesCount (M), Series* (O), Comment* (O).
 */
public class ReturnRequest {
    private String telephoneNumber;
    private String originatingOrderNumber;
    private int seriesCount;
    private List<SeriesEntry> series;
    private List<String> comments;

    public static class SeriesEntry {
        private String start;
        private String end;

        public String getStart() { return start; }
        public void setStart(String start) { this.start = start; }
        public String getEnd() { return end; }
        public void setEnd(String end) { this.end = end; }
    }

    public String getTelephoneNumber() { return telephoneNumber; }
    public void setTelephoneNumber(String telephoneNumber) { this.telephoneNumber = telephoneNumber; }
    public String getOriginatingOrderNumber() { return originatingOrderNumber; }
    public void setOriginatingOrderNumber(String originatingOrderNumber) { this.originatingOrderNumber = originatingOrderNumber; }
    public int getSeriesCount() { return seriesCount; }
    public void setSeriesCount(int seriesCount) { this.seriesCount = seriesCount; }
    public List<SeriesEntry> getSeries() { return series; }
    public void setSeries(List<SeriesEntry> series) { this.series = series; }
    public List<String> getComments() { return comments; }
    public void setComments(List<String> comments) { this.comments = comments; }
}
