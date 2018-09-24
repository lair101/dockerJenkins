From centos:centos7

LABEL Vendor="CentOS"
LABEL License=GPLv2
LABEL Version=5.5.41
LABEL Description="This is a base image, which provides the Jenkins agent executable (slave.jar)" Vendor="Jenkins project" Version="3.23"

RUN yum -y update; yum clean all
RUN yum -y install openssh-server passwd java-1.8.0-openjdk-devel curl wget python python-pip git; yum clean all

#Install perl
RUN yum -y install perl perl-core && yum clean all

#install maven
ARG MAVEN_VERSION=3.3.9
ENV MAVEN_URL http://ftp.halifax.rwth-aachen.de
ENV MAVEN_PKG ${MAVEN_URL}/apache/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz
ENV MAVEN_HOME /opt/apache-maven-${MAVEN_VERSION}
ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:${MAVEN_HOME}/bin WORKDIR /opt
RUN curl ${MAVEN_PKG} | tar xz

# Installs Ant
ARG ANT_VERSION=1.10.5
RUN cd && \
    wget -q http://www.us.apache.org/dist//ant/binaries/apache-ant-${ANT_VERSION}-bin.tar.gz && \
    tar -xzf apache-ant-${ANT_VERSION}-bin.tar.gz && \
    mv apache-ant-${ANT_VERSION} /opt/ant && \
    rm apache-ant-${ANT_VERSION}-bin.tar.gz
ENV ANT_HOME /opt/ant
ENV PATH ${PATH}:/opt/ant/bin

#install Jenkins_slave
ARG user=jenkins
ARG group=jenkins
ARG uid=10000
ARG gid=10000
ENV HOME /home/${user}
RUN groupadd -g ${gid} ${group}
RUN useradd -c "Jenkins user" -d $HOME -u ${uid} -g ${gid} -m ${user}
ARG VERSION=3.23
ARG AGENT_WORKDIR=/home/${user}/agent
RUN curl --create-dirs -sSLo /usr/share/jenkins/slave.jar https://repo.jenkins-ci.org/public/org/jenkins-ci/main/remoting/${VERSION}/remoting-${VERSION}.jar \
  && chmod 755 /usr/share/jenkins \
  && chmod 644 /usr/share/jenkins/slave.jar
USER ${user}
ENV AGENT_WORKDIR=${AGENT_WORKDIR}
RUN mkdir /home/${user}/.jenkins && mkdir -p ${AGENT_WORKDIR}
VOLUME /home/${user}/.jenkins
VOLUME ${AGENT_WORKDIR}
WORKDIR /home/${user}



CMD [ "python", "-u", "/var/lib/jenkins/slave.py" ]
