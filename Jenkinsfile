pipeline {
    agent { label 'Jenkins-agent' }

    tools {
        jdk 'java17'
        maven 'maven3'
    }

    stages {
        stage('Checkout') {
            steps {
                // We use the 'scm' variable so it uses the repo YOU configured in the Jenkins UI
                checkout scm
                sh 'ls -R'
            }
        }

        stage('Build Application') {
            steps {
                script {
                    // Search for Maven (Java)
                    def pomPath = sh(script: 'find . -name "pom.xml" -not -path "*/target/*" | head -n 1', returnStdout: true).trim()
                    
                    if (pomPath) {
                        def pomDir = pomPath.replace('/pom.xml', '')
                        if (pomDir == "") pomDir = "."
                        echo "Detected Java project at: ${pomDir}"
                        dir(pomDir) {
                            sh 'mvn clean install -DskipTests'
                        }
                    } 
                    // Search for .NET (C#) if Java isn't found
                    else {
                        def dotnetPath = sh(script: 'find . -name "*.csproj" | head -n 1', returnStdout: true).trim()
                        if (dotnetPath) {
                            def dotnetDir = dotnetPath.split('/')[0..-2].join('/')
                            echo "Detected .NET project at: ${dotnetDir}. Note: Requires .NET SDK on Agent."
                            dir(dotnetDir) {
                                // Only run if dotnet is installed on agent
                                sh 'dotnet build'
                            }
                        } else {
                            error "No Java (pom.xml) or .NET (.csproj) files found!"
                        }
                    }
                }
            }
        }

        stage('Tests') {
            steps {
                script {
                    def pomPath = sh(script: 'find . -name "pom.xml" -not -path "*/target/*" | head -n 1', returnStdout: true).trim()
                    if (pomPath) {
                        dir(pomPath.replace('/pom.xml', '')) {
                            sh 'mvn test'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
