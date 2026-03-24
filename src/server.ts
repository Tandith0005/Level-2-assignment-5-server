import app from "./app.js";
import { envVars } from "./config/envVars.js";

const PORT = envVars.PORT || 5000;

const bootstrap = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

bootstrap();
