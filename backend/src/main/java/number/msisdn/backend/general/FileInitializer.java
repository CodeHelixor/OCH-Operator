package number.msisdn.backend.general;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

// @Component
// public class FileInitializer {

//     private static final String FILE_NAME = "operator";

//     @PostConstruct
//     public void initBatchFile() {
//         try {
//             // Get the directory of the running JAR
//             Path jarDir = Paths.get(FileInitializer.class.getProtectionDomain().getCodeSource().getLocation().toURI()).getParent();
//             File file = new File(jarDir.toFile(), FILE_NAME);

//             if (!file.exists()) {
//                 boolean created = file.createNewFile();
//                 if (created) {
//                     try (FileWriter writer = new FileWriter(file)) {
//                         writer.write("00000");
//                         System.out.println("File 'operator' is created at: " + file.getAbsolutePath());
//                     }
//                 }
//             } else {
//                 System.out.println("File 'operator' already exists at: " + file.getAbsolutePath());
//             }

//         } catch (IOException | URISyntaxException e) {
//             System.err.println("Failed to create or write to the file 'operator': " + e.getMessage());
//         }
//     }
// }

@Component
public class FileInitializer {

    private static final String FILE_NAME = "operator";
    private static final String FILE_PATH = "./" + FILE_NAME; // current directory

    @PostConstruct
    public void initBatchFile() {
        File file = new File(FILE_PATH);

        if (!file.exists()) {
            try {
                boolean created = file.createNewFile();
                if (created) {
                    try (FileWriter writer = new FileWriter(file)) {
                        writer.write("operator:00000");
                        // System.out.println("File 'operator' is created.");
                    }
                }
            } catch (IOException e) {
                if (!OCHResponseLogger.REQUEST_RESPONSE_ONLY) System.err.println("Failed to create or write to the file 'operator': " + e.getMessage());
            }
        } else {
            // System.out.println("File 'operator' already exists.");
        }
    }
}
