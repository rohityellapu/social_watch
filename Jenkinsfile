pipeline{
    environment{
            CURRENT_BRANCH_NAME = "$BRANCH_NAME"
            URL_NAME = "$GIT_URL"
            gitlabSourceRepoName = URL_NAME.substring(URL_NAME.lastIndexOf('/')+1,URL_NAME.length())
            CONTAINER_NAME = ("$gitlabSourceRepoName-$CURRENT_BRANCH_NAME".toLowerCase())
            DEPLOY_SERVER = "${env."${CURRENT_BRANCH_NAME}-server"}"
                def REGISTRY = "lacritzadmin/$CONTAINER_NAME"
                def REGISTRYCREDENTIAL = 'dockerhub'
                DOCKERIMAGE = ''
            HOSTPORT = '3015'
            DOCKERPORT = '3000'
            SSHPORT = "${env."${CURRENT_BRANCH_NAME}-ssh"}"
        }
    agent any
stages{
    stage("Git Checkout"){
        steps{
            git branch: "${CURRENT_BRANCH_NAME}",
            credentialsId: 'devops',
            url: "${URL_NAME}.git"
        }
    }
    /*stage("Print Env Var"){
        steps{
            sh 'printenv'
        }
    }
    stage("Copying Environment File"){
        steps {
            script {
                sh "cp /dbadmin/${gitlabSourceRepoName.toLowerCase()}/$CURRENT_BRANCH_NAME/.env ."
            }
        }
    }
    stage("Copying certificates "){
        steps {
            script {
                sh "cp /dbadmin/${gitlabSourceRepoName.toLowerCase()}/$CURRENT_BRANCH_NAME/certs/* ./certs/"
            }
        }
    }*/
    stage('Build Docker Image'){
        steps{
            script{
                sh "whoami && hostname"
                DOCKERIMAGE = docker.build REGISTRY + ":$BUILD_NUMBER"
            }
        }
    }
    stage('Pushing Image To Dockerhub') {
        steps{
            script{
                docker.withRegistry( '', REGISTRYCREDENTIAL ) {
                    DOCKERIMAGE.push()
                }
                }
        }
    }

    stage('Deleting Previous Container'){
        steps{
              script {
                sh '''
                    ssh -o StrictHostKeyChecking=no -p ${SSHPORT} devops@$DEPLOY_SERVER 'bash -s' << 'ENDSSH' "${CONTAINER_NAME}" "${REGISTRY}"
                    CONTAINER_NAME=$1
                    REGISTRY=$2

                    if [ $( docker ps -a | grep $CONTAINER_NAME | wc -l ) -gt 0 ]; then
                            docker stop $CONTAINER_NAME
                            docker rm -f $CONTAINER_NAME
                            sleep 5
                            for i in $(docker images | grep $REGISTRY | awk '{print $1":"$2}');
                            do
                                docker rmi -f $i
                                echo "The Previous Image with Build Number ${i} deleted"
                            done
                            sleep 5
                            echo "The Previous Container ${CONTAINER_NAME} deleted"
                    else
                            echo "no previous container & image exist"
                    fi
                '''
                }
        }
        }
    stage('Deployment In Respective Server'){
        steps{
            script {
                    def DOCKERRUN="docker run -p $HOSTPORT:$DOCKERPORT -d --network dashboard_network --name $CONTAINER_NAME $REGISTRY:$BUILD_NUMBER"
                    sh "ssh -o StrictHostKeyChecking=no -p ${SSHPORT} devops@$DEPLOY_SERVER ${DOCKERRUN}"
                }
            }
        }
    }
}