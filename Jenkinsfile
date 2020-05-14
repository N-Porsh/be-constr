#!groovy


node('AWS-PIPELINE-1') {

  def branchName = env.BRANCH_NAME

  stage('Prepare'){

      def scmVars = checkout scm
      gitCommit = scmVars.GIT_COMMIT.substring(0, 7)
      gitBranch = scmVars.GIT_BRANCH
      dockerImageTag = "${gitBranch}-${gitCommit}"
      echo "DOCKER TAG: ${dockerImageTag}"
      echo "GIT BRANCH: ${gitBranch}"

    }

    if (branchName == 'master') {

      stage('Build backend image'){

        sh '$(aws ecr get-login --no-include-email --region eu-west-1)'
        dockerImage = docker.build("585988821820.dkr.ecr.eu-west-1.amazonaws.com/mapri-backend:${dockerImageTag}", "./")
        dockerImageLatest = docker.build("585988821820.dkr.ecr.eu-west-1.amazonaws.com/mapri-backend:${gitBranch}", "./")

      }

      stage ('Push to registry') {

      dockerImage.push()
      dockerImageLatest.push()

      }

      stage('Clean up'){
        cleanWs()
      }

      stage('Build infra'){
        build job: 'mapri-infra'
      }

    }

}
