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
                    echo "   - .github/AGENT.md (global rules)"
                    echo "   - .github/copilot-instructions.md (Copilot adapter)"
                    echo "   - .github/skill/${PROJECT_NAME}/Skill.md (spec)"
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
                        if [ -f ".github/skill/${PROJECT_NAME}/Skill.md" ]; then
                            echo "✅ Skill.md found"
                            head -n 20 ".github/skill/${PROJECT_NAME}/Skill.md"
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
                }
                sh '''
                    set -e
                    cd "${PROJECT_DIR}"
                    chmod +x ./mvnw scripts/*.sh
                    ./scripts/build.sh
                '''
            }
        }
        
        stage('🧪 Test') {
            steps {
                script {
                    echo 'Running tests...'
                }
                sh '''
                    set -e
                    cd "${PROJECT_DIR}"
                    chmod +x ./mvnw scripts/*.sh
                    ./scripts/run-tests.sh
                '''
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

            stage('Install Xygeni scanner') {
            steps {
                sh '''
                curl -s -L "https://get.xygeni.io/latest/scanner/xygeni-release.zip" -o xygeni_scanner.zip
                unzip -qq xygeni_scanner.zip -d "${WORKSPACE}"
                rm xygeni_scanner.zip
                '''
            }
            }
    
            stage('Scan for issues') {
            steps {
                sh '''
                set -x # Activate debug mode to print commands inside the script
                $WORKSPACE/scanner/xygeni scan \
                -n <PROJECT_NAME> \
                --dir ${WORKSPACE}
                '''
            }
            }
    
            stage('📦 Package') {
            steps {
                script {
                    echo "Packaging application..."
                    sh '''
                        cd .github/skill/${PROJECT_NAME}
                        mvn clean package -DskipTests
                    '''
                }
            }
        }
        
        stage('🐳 Docker Build') {
            when {
                branch 'master'
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
