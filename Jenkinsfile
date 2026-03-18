pipeline {
    agent {
        label 'Jenkins-agent'
    }

    tools {
        // These names MUST match Manage Jenkins -> Tools exactly
        jdk 'java17'
        maven 'maven3'
    }

    stages {
        stage('Checkout from SCM') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', 
                    credentialsId: 'github', 
                    url: 'https://github.com/sandeepaksm/example-voting-app.git'
                
                // Diagnostic: Show the root files
                sh 'ls -F'
            }
        }

        stage('Build Maven Application') {
            steps {
                script {
                    echo 'Searching for pom.xml...'
                    // Locates the directory containing the pom.xml automatically
                    def findPom = sh(script: 'find . -name "pom.xml" -not -path "*/target/*" | head -n 1', returnStdout: true).trim()
                    
                    if (findPom) {
                        // Extract the directory path from the file path
                        def pomDir = findPom.split('/pom.xml')[0]
                        if (pomDir == ".") pomDir = "" // Handle root directory case
                        
                        echo "Found Maven project in directory: ${pomDir}"
                        
                        dir(pomDir) {
                            sh 'mvn clean install -DskipTests'
                        }
                    } else {
                        error "FAILURE: No pom.xml found in the repository. Is this a Java project?"
                    }
                }
            }
        }

        stage('Maven Test') {
            steps {
                script {
                    def findPom = sh(script: 'find . -name "pom.xml" -not -path "*/target/*" | head -n 1', returnStdout: true).trim()
                    if (findPom) {
                        def pomDir = findPom.split('/pom.xml')[0]
                        dir(pomDir) {
                            sh 'mvn test'
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Test completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs to see if pom.xml was found.'
        }
        cleanup {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
