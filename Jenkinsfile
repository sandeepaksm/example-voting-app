pipeline {
    agent {
        label 'Jenkins-agent'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls the code from your GitHub
                checkout scm
            }
        }

        stage('Build .NET Worker') {
            steps {
                // Moves into the 'worker' folder where the .csproj lives
                dir('worker') {
                    echo 'Restoring .NET dependencies...'
                    sh 'dotnet restore'
                    
                    echo 'Compiling the Worker application...'
                    sh 'dotnet build --configuration Release'
                }
            }
        }

        stage('Build Result Node App') {
            steps {
                dir('result') {
                    echo 'If you have Node installed, we could build this too...'
                    sh 'npm --version || echo "Node not installed on agent yet"'
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: The Agent finally had the right tools and built the code!'
        }
        failure {
            echo 'FAILURE: Did you run the sudo apt install dotnet-sdk commands on the Agent VM?'
        }
        always {
            cleanWs()
        }
    }
}
