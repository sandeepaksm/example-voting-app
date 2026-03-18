pipeline {
    agent {
        label 'Jenkins-agent'
    }

    tools {
        // Ensure these match your "Manage Jenkins > Tools" names exactly
        jdk 'java17'
        maven 'maven3'
    }

    stages {
        stage('Checkout Java Branch') {
            steps {
                echo 'Cloning the JAVA version of the repository...'
                // We specify the 'java' branch because 'main' is now .NET
                git branch: 'java', 
                    credentialsId: 'github', 
                    url: 'https://github.com/dockersamples/example-voting-app.git'
                
                sh 'ls -F worker/'
            }
        }

        stage('Build Maven Application') {
            steps {
                echo 'Building the Java Worker...'
                dir('worker') {
                    // This will now find the pom.xml successfully
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Maven Test') {
            steps {
                echo 'Running Unit Tests...'
                dir('worker') {
                    sh 'mvn test'
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: The Java worker was built correctly!'
        }
        failure {
            echo 'FAILURE: Check if the "worker" folder contains a pom.xml.'
        }
        cleanup {
            cleanWs()
        }
    }
}
