package number.msisdn.backend.general;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileUtility {
    private static final String FILE_PATH = "./operator";

    public static String readOperator() throws IOException {
        File file = new File(FILE_PATH);

        if (!file.exists()) {
            throw new FileNotFoundException("File not found: " + FILE_PATH);
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while((line = reader.readLine())!=null){
                if(line.trim().toLowerCase().startsWith("operator:")){
                    String[] parts = line.split(":",2);
                    if(parts.length == 2){
                        return parts[1].trim();
                    }
                }
            }
        } 
        throw new IOException("No operator line found in the file.");
 
    }

    /**
     * Writes an integer value to the operator file, replacing its contents.
     */
    public static void writeOperator(int value) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH, false))) {
            writer.write(String.valueOf(value));
        }
    }
}
