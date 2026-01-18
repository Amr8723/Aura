> # **RUN AURA LOCALLY**
> 
> ### **PREREQUISITES**
> - **Node.js 18+** installed on your system
> 
> ### **INSTALLATION**
> 
> **1. Install Dependencies**  
> ```bash
> npm install
> ```
> 
> **2. Configure Environment**  
> - Create an environment file:  
> ```bash
> echo "GEMINI_API_KEY=your_key_here" > .env.local
> ```  
> - Replace `your_key_here` with your actual **Google AI Studio API key**.
> 
> **3. Launch Development Server**  
> ```bash
> npm run dev
> ```
> 
> **ACCESS THE EXPERIENCE**  
> Open your browser and navigate to:  
> ```
> http://localhost:3000
> ```  
> The **AURA interface** will load in **dark mode by default** — this is intentional.
> 
> ### **TROUBLESHOOTING**
> 
> | Issue               | Solution                                                                 |
> | ------------------ | ------------------------------------------------------------------------ |
> | Port 3000 in use    | Run `kill -9 $(lsof -ti:3000)` or use `npm run dev -- --port 3001`       |
> | Missing API key     | Ensure `.env.local` exists in the root directory                          |
> | Build errors        | Clear cache: `rm -rf node_modules/.cache` then reinstall                  |
> 
> ### **ENVIRONMENT VARIABLES**
> 
> **Required:**  
> ```env
> GEMINI_API_KEY=your_google_ai_studio_key_here
> ```
> 
> **Optional (for advanced features):**  
> ```env
> NEXT_PUBLIC_ENABLE_3D=true
> NEXT_PUBLIC_ANALYTICS_ID=aura_analytics
> ```
> 
> ### **QUICK START FOR CONTRIBUTORS**
> 
> 1. Fork the repository  
> 2. Clone your fork  
> 3. Create a feature branch  
> 4. Make changes  
> 5. Test locally  
> 6. Submit a pull request  
> 
> ```bash
> git clone https://github.com/your-username/aura.git
> cd aura
> npm install
> npm run dev
> ```
> 
> > **Note:** AURA is designed for modern browsers. For optimal experience, use **Chrome 90+**, **Firefox 88+**, or **Safari 15+**.  
> > Questions? Check the GitHub Issues or create a new Discussion.
> 
> **AURA IS DESIGNED, NOT ASSEMBLED.**  
> **NOW EXPERIENCE IT.**
