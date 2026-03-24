pipeline {
    agent { label 'Jenkins-Agent' } // Running on your VM01-VPC agent

    tools {
        maven 'Maven3' // Name from Manage Jenkins -> Tools
        jdk 'jdk17'    // Name from Manage Jenkins -> Tools
    }

    stages {
        stage('1. Workspace Cleanup') {
            steps {
                echo 'Cleaning up the build environment...'
                cleanWs() 
            }
        }

        stage('2. Checkout from SCM') {
            steps {
                echo "Fetching code from: ${repoUrl}"
                git branch: 'main', url: 'https://github.com/sandeepaksm/example-voting-app.git'
            }
        }

        stage('3. Unit Testing') {
            steps {
                echo 'Executing Maven tests...'
                // Using 'sh' to execute the maven test command
                sh 'mvn test'
            }
        }

        stage('4. Build & Package') {
            steps {
                echo 'Compiling code and creating artifact...'
                // This creates the .jar or .war file in the /target folder
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('5. Archive Artifacts') {
            steps {
                echo 'Saving the build results in Jenkins...'
                // This makes the JAR file downloadable from the Jenkins UI
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        failure {
            echo 'Build failed! Check the Console Output for Maven errors.'
        }
    }
}
