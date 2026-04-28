// Jenkinsfile - CI/CD Pipeline para MapfreMX
// CloudBees Unify + SDD Strategy + IDP Platform
// Configured for: .github/skill/policy-reader-api
// Repository: https://github.com/AngC1/MapfreMX

pipeline {
    agent any
    
    triggers {
        githubPush()
        pollSCM('H/15 * * * *')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '15', daysToKeepStr: '30'))
        timeout(time: 2, unit: 'HOURS')
        timestamps()
        ansiColor('xterm')
    }

    environment {
        PROJECT_NAME = 'policy-reader-api'
        PROJECT_DIR = '.github/skill/policy-reader-api'
        REGISTRY = 'docker.io'
        IMAGE_TAG = "${BUILD_NUMBER}"
        MAVEN_HOME = "/home/jenkins/.maven/maven-3.9.15"
        JAVA_HOME = "/usr/lib/jvm/java-21-openjdk"
        PATH = "${JAVA_HOME}/bin:${MAVEN_HOME}/bin:${PATH}"
    }

    stages {
        stage('📋 Checkout & Validate') {
            steps {
                checkout scm
                script {
                    echo "✅ Repository checked out"
                    echo "   Branch: ${BRANCH_NAME ?: env.GIT_BRANCH ?: 'N/A'}"
                    echo "   Commit: ${GIT_COMMIT?.take(8) ?: 'N/A'}"
                    echo "   URL: ${GIT_URL ?: 'N/A'}"
                }
            }
        }
        
        stage('🔧 Validate Environment') {
            steps {
                script {
                    echo "🔧 Validating build environment..."
                    sh '''
                        set -e
                        echo "   Maven: $(mvn -v | head -1)"
                        echo "   Java: $(java -version 2>&1 | head -1)"
                        echo "   Git: $(git --version)"
                        echo "   Docker: $(docker --version)"
                    '''
                }
            }
        }
        
        stage('🏗️ Build') {
            steps {
                script {
                    echo "🏗️  Building ${PROJECT_NAME}..."
                }
                sh '''
                    set -e
                    cd "${PROJECT_DIR}"
                    
                    # Use global Maven with fallback detection
                    if ! command -v mvn &> /dev/null; then
                        echo "⚠️  Maven not in PATH, looking for local installation..."
                        if [ -d "$HOME/.maven/maven-3.9.15/bin" ]; then
                            export PATH="$HOME/.maven/maven-3.9.15/bin:$PATH"
                        elif [ -d "$HOME/.maven/maven-3.9.12/bin" ]; then
                            export PATH="$HOME/.maven/maven-3.9.12/bin:$PATH"
                        else
                            echo "❌ Maven not found"
                            exit 1
                        fi
                    fi
                    
                    mvn clean compile -B -ntp -DskipTests
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
                    
                    # Maven environment setup (same as Build stage)
                    if ! command -v mvn &> /dev/null; then
                        if [ -d "$HOME/.maven/maven-3.9.15/bin" ]; then
                            export PATH="$HOME/.maven/maven-3.9.15/bin:$PATH"
                        elif [ -d "$HOME/.maven/maven-3.9.12/bin" ]; then
                            export PATH="$HOME/.maven/maven-3.9.12/bin:$PATH"
                        fi
                    fi
                    
                    mvn test -B -ntp
                '''
            }
        }
        
        stage('📊 Test Results') {
            steps {
                script {
                    echo "📊 Collecting test results..."
                }
                junit testResults: "${PROJECT_DIR}/target/surefire-reports/*.xml", 
                      allowEmptyResults: true,
                      healthScaleFactor: 100.0
            }
        }

        stage('📦 Package & Verify') {
            steps {
                script {
                    echo "📦 Packaging application..."
                }
                sh '''
                    set -e
                    cd "${PROJECT_DIR}"
                    
                    # Maven environment setup
                    if ! command -v mvn &> /dev/null; then
                        if [ -d "$HOME/.maven/maven-3.9.15/bin" ]; then
                            export PATH="$HOME/.maven/maven-3.9.15/bin:$PATH"
                        elif [ -d "$HOME/.maven/maven-3.9.12/bin" ]; then
                            export PATH="$HOME/.maven/maven-3.9.12/bin:$PATH"
                        fi
                    fi
                    
                    mvn clean package -B -ntp -DskipTests
                    
                    # Verify JAR creation
                    if [ -f "target/policy-reader-api-0.0.1-SNAPSHOT.jar" ]; then
                        echo "✅ JAR file created successfully"
                        JAR_SIZE=$(stat -f%z "target/policy-reader-api-0.0.1-SNAPSHOT.jar" 2>/dev/null || \
                                   stat -c%s "target/policy-reader-api-0.0.1-SNAPSHOT.jar" 2>/dev/null || \
                                   echo "unknown")
                        echo "   Size: ${JAR_SIZE} bytes"
                    fi
                '''
                archiveArtifacts artifacts: "${PROJECT_DIR}/target/*.jar", 
                                 allowEmptyArchive: false,
                                 fingerprint: true
            }
        }
        
        stage('🐳 Docker Build') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    echo "🐳 Building Docker image..."
                }
                sh '''
                    set -e
                    cd "${PROJECT_DIR}"
                    
                    if [ -f "Dockerfile" ]; then
                        docker build -t ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG} . \
                                   --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
                                   --build-arg VCS_REF=${GIT_COMMIT}
                        docker tag ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG} ${REGISTRY}/${PROJECT_NAME}:latest
                        echo "✅ Docker image built: ${REGISTRY}/${PROJECT_NAME}:${IMAGE_TAG}"
                    else
                        echo "⚠️  Dockerfile not found, skipping Docker build"
                    fi
                '''
            }
        }
        
        stage('🔍 Security Scan (Xygeni)') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    echo "🔍 Running Xygeni security scan..."
                }
                sh '''
                    set -e
                    XYGENI_HOME="${WORKSPACE}/xygeni-scanner"
                    
                    # Download Xygeni CLI if not present
                    if [ ! -d "$XYGENI_HOME" ]; then
                        echo "📥 Downloading Xygeni CLI..."
                        mkdir -p "$XYGENI_HOME"
                        
                        # Note: Replace with actual Xygeni download URL
                        # wget -q https://xygeni-release.s3.amazonaws.com/xygeni-scanner.zip -O xygeni-scanner.zip
                        # unzip -q xygeni-scanner.zip -d "$XYGENI_HOME"
                        
                        echo "⚠️  Xygeni URL not configured - update pipeline with actual URL"
                    fi
                    
                    # Run scan (commented until Xygeni is properly configured)
                    # cd "${PROJECT_DIR}"
                    # $XYGENI_HOME/bin/xygeni scan -r . -p ${PROJECT_NAME} --output ${WORKSPACE}/xygeni-report.json
                    
                    echo "ℹ️  Xygeni scan would execute here"
                '''
            }
        }
        
        stage('✅ Build Complete') {
            steps {
                script {
                    echo "✅ Pipeline execution completed successfully"
                    echo "   Project: ${PROJECT_NAME}"
                    echo "   Build #: ${BUILD_NUMBER}"
                    echo "   Status: SUCCESS ✓"
                    echo "   Duration: ${currentBuild.durationString}"
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "🧹 Pipeline Cleanup"
                // Optional: uncomment to clean workspace after build
                // cleanWs()
            }
        }
        success {
            script {
                echo "✅ BUILD SUCCESS - All stages completed"
                echo "   Repository: https://github.com/AngC1/MapfreMX"
                echo "   Build Number: ${BUILD_NUMBER}"
                echo "   Timestamp: ${new java.util.Date().format('yyyy-MM-dd HH:mm:ss')}"
            }
        }
        failure {
            script {
                echo "❌ BUILD FAILED - Check logs above for details"
                echo "   Build Log: ${env.BUILD_URL}console"
            }
        }
        unstable {
            script {
                echo "⚠️  BUILD UNSTABLE - Some tests may have failed"
            }
        }
        cleanup {
            script {
                echo "🧹 Final cleanup completed"
            }
        }
    }
}
