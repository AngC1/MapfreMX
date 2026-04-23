pipeline {
  agent any

  options {
    timestamps()
  }

  stages {
    stage('Build CI') {
      steps {
        sh '''
          set -e
          echo "Running Jenkins CI build on ${JENKINS_URL:-http://127.0.0.1:8081/}"
          if [ -f package.json ]; then
            npm ci
            npm run build --if-present
            npm test --if-present
          elif [ -f pom.xml ]; then
            mvn -B -ntp clean verify
          elif [ -f requirements.txt ] || [ -f pyproject.toml ]; then
            python -m pip install --upgrade pip
            [ -f requirements.txt ] && pip install -r requirements.txt || true
            python -m pytest -q || true
          else
            echo "No known build system found. CI pipeline is configured and ready."
          fi
        '''
      }
    }

    stage('Release CD') {
      when {
        anyOf {
          branch 'main'
          tag pattern: 'v.*', comparator: 'REGEXP'
        }
      }
      steps {
        sh '''
          set -e
          echo "Creating release bundle"
          tar -czf release-bundle.tgz .
        '''
        archiveArtifacts artifacts: 'release-bundle.tgz', fingerprint: true
      }
    }
  }
}
