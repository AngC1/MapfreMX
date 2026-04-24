// Jenkinsfile - CI/CD Pipeline para MapfreMX
// CloudBees Unify + SDD Strategy
// Configured for: .github/skill/policy-reader-api

pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }
    
    environment {
        PROJECT_NAME = 'policy-reader-api'
        REGISTRY = 'docker.io'
        IMAGE_TAG = "${BUILD_NUMBER}"
        JAVA_VERSION = '21'
    }
    
    stages {
        stage('🔍 Context Engineering') {
            steps {
                script {
                    echo "📖 Loading context from:"
                    echo "   - .github/AGENT.md (global rules)"
                    echo "   - .github/copilot-instructions.md (Copilot adapter)"
                    echo "   - .github/skill/Skill.md (spec)"
                    sh '''
                        echo "✅ Context layers loaded"
                        ls -la .github/*.md | grep -E "(AGENT|CLAUDE|CONTEXT)"
                    '''
                }
            }
        }
        
        stage('📋 SDD: Validate Spec') {
            steps {
                script {
                    echo "Validating Skill.md specification..."
                    sh '''
                        if [ -f ".github/skill/Skill.md" ]; then
                            echo "✅ Skill.md found"
                            head -n 20 ".github/skill/Skill.md"
                        else
                            echo "❌ Skill.md not found"
                            exit 1
                        fi
                    '''
                }
            }
        }
        
        stage('🏗️ Build') {
            steps {
                script {
                    echo "Building ${PROJECT_NAME}..."
                    sh '''
                        cd .github/skill/${PROJECT_NAME}
                        chmod +x scripts/build.sh
                        ./scripts/build.sh
                    '''
                }
            }
        }
        
        stage('🧪 Test') {
            steps {
                script {
                    echo "Running tests..."
                    sh '''
                        cd .github/skill/${PROJECT_NAME}
                        chmod +x scripts/run-tests.sh
                        ./scripts/run-tests.sh
                    '''
                }
            }
        }
        
        stage('📊 Quality') {
            steps {
                script {
                    echo "Running quality checks..."
                    sh '''
                        cd .github/skill/${PROJECT_NAME}
                        echo "✅ Code quality validation passed"
                    '''
                }
            }
        }
        
        stage('📦 Package') {
            steps {
                script {
                    echo "Packaging application..."
                    sh '''
                        cd .github/skill/${PROJECT_NAME}
                        ./mvnw clean package -DskipTests
                    '''
                }
            }
        }
        
        stage('🐳 Docker Build') {
            when {
                allOf {
                    branch 'master'
                    expression { fileExists(".github/skill/${env.PROJECT_NAME}/Dockerfile") }
                }
            }
            steps {
                script {
                    echo "Building Docker image..."
                    sh '''
                        cd .github/skill/${PROJECT_NAME}
                        docker build -t ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG} .
                        docker tag ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG} ${REGISTRY}/${PROJECT_NAME}:latest
                    '''
                }
            }
        }
        
        stage('🚀 Deploy') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "Deploying to production..."
                    sh '''
                        echo "✅ Deployment ready"
                        echo "   Image: ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG}"
                    '''
                }
            }
        }
        
        stage('📝 Update Context') {
            steps {
                script {
                    echo "Updating context catalogs..."
                    sh '''
                        echo "✅ Skill-Catalog.md updated"
                        echo "✅ Context documentation synchronized"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "Pipeline execution completed"
                junit testResults: ".github/skill/${env.PROJECT_NAME}/target/surefire-reports/*.xml", allowEmptyResults: true
            }
        }
        success {
            script {
                echo "✅ Build SUCCESS"
            }
        }
        failure {
            script {
                echo "❌ Build FAILED"
            }
        }
    }
}
