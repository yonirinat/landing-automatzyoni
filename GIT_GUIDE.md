# Git Synchronization Guide

Follow the steps below to synchronize your project with Git:

1. **Initialize the Repository**  
   Open a terminal in your project folder and run:

   ```
   git init
   ```

   This creates a new Git repository in your project.

2. **Add a .gitignore File**  
   Create a `.gitignore` file to exclude files or folders you don’t want to commit (e.g., temporary files, build outputs):

   ```
   # ...existing files and folders to ignore...
   node_modules/
   *.log
   ```

   Save the file in your project root.

3. **Stage and Commit Your Files**  
   Add all files and commit your changes:

   ```
   git add .
   git commit -m "Initial commit"
   ```

4. **Create a Remote Repository**  
   On GitHub (or another Git host), create a new repository. Then, add it as a remote:

   ```
   git remote add origin https://github.com/yourusername/your-repo.git
   ```

5. **Push Your Changes**  
   Push your commit to the remote repository:

   ```
   git push -u origin main
   ```

   (Replace `main` with your branch name if different.)

6. **Subsequent Synchronization**  
   For future updates, run:

   - To add changes:
     ```
     git add .
     ```
   - To commit:
     ```
     git commit -m "Description of changes"
     ```
   - To push:
     ```
     git push
     ```

7. **Pulling Remote Changes**  
   If you work on multiple machines or with a team, always pull before starting work:
   ```
   git pull
   ```

This guide will help you manage your project versioning with Git.
