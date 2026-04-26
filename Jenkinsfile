// Jenkinsfile - CI/CD Pipeline para MapfreMX
// CloudBees Unify + SDD Strategy
// Configured for: .github/skill/policy-reader-api

pipeline {
    agent any
    
    triggers {
        githubPush()
        pollSCM('H/15 * * * *')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    environment {
        PROJECT_NAME = 'policy-reader-api'
        PROJECT_DIR = '.github/skill/policy-reader-api'
        REGISTRY = 'docker.io'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('📋 Checkout & Validate') {
            steps {
                checkout scm
                script {
                    echo "✅ Repository checked out"
                    echo "   Branch: ${BRANCH_NAME ?: 'N/A'}"
                    echo "   Commit: ${GIT_COMMIT ?: 'N/A'}"
                }
            }
        }
        
        stage('🏗️ Build') {
            steps {
                script {
                    echo "Building ${PROJECT_NAME}..."
                }
                sh '''
                    set -e
                    cd "${PROJECT_DIR}"
                    chmod +x ./mvnw scripts/*.sh
                    ./scripts/build.sh
                '''
            }
        }
        
        stage('🧪 Unit Tests') {
            steps {
                script {
                    echo '🧪 Running unit tests...'
                }
                sh '''
                    set -e
                    cd "${PROJECT_DIR}"
                    chmod +x ./mvnw scripts/*.sh
                    ./scripts/run-tests.sh
                '''
            }
        }
        
        stage('📊 Test Results') {
            steps {
                script {
                    echo "📊 Collecting test results..."
                }
                junit testResults: "${PROJECT_DIR}/target/surefire-reports/*.xml", allowEmptyResults: true
                }
            }
        }

        stage('📦 Package') {
            steps {
                script {
                    echo "📦 Packaging application..."
                }
                sh '''
                    cd "${PROJECT_DIR}"
                    ./mvnw clean package -DskipTests -B -ntp
                '''
                }
            }
        }
        
        stage('🐳 Docker Build (master only)') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "🐳 Building Docker image..."
                }
                sh '''
                    cd "${PROJECT_DIR}"
                    docker build -t ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG} .
                    docker tag ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG} ${REGISTRY}/${PROJECT_NAME}:latest
                    echo "✅ Docker image built: ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG}"
                '''
                }
            }
        }
        
        stage('✅ Build Complete') {
            steps {
                script {
                    echo "✅ Pipeline execution completed successfully"
                    echo "   Project: ${PROJECT_NAME}"
                    echo "   Build: ${BUILD_NUMBER}"
                    echo "   Status: SUCCESS"
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "Pipeline Cleanup"
                cleanWs()
            }
        }
        success {
            script {
                echo "✅ Build SUCCESS - All stages completed"
            }
        }
        failure {
            script {
                echo "❌ Build FAILED - Check logs above for details"
            }
        }
    }
}
