pipeline {
    agent {
        label 'Jenkins-agent'
    }

    tools {
        jdk 'jdk17'
        maven 'maven3'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                echo 'Cleaning up previous build artifacts...'
                // This plugin deletes the workspace directory before starting
                cleanWs()
            }
        }

        stage('Checkout from SCM') {
            steps {
                // 'scm' refers to the repository configured in the Job UI
                git branch:'main',credentialsID:'github',Url:'https://github.com/sandeepaksm/example-voting-app'
            }
        }

        stage('Build Maven Application') {
            steps {
                // 'clean' ensures no old target files interfere
                // 'install' puts the artifact in the local .m2 repo
                sh 'mvn clean install -DskipTests'
            }
        }

        stage('Test application') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
