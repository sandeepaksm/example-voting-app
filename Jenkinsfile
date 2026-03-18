pipeline {
    agent {
        label 'Jenkins-agent'
    }

    tools {
        // Double check this name in Manage Jenkins -> Tools
        jdk 'java17' 
        maven 'maven3'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout from SCM') {
            steps {
                // Fixed: lowercase 'url' and 'credentialsId'
                git branch: 'main', 
                    credentialsId: 'github', 
                    url: 'https://github.com/sandeepaksm/example-voting-app.git'
            }
        }

        stage('Build Maven Application') {
            steps {
                sh 'mvn clean install -DskipTests'
            }
        }

        stage('Maven Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
