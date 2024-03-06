FROM rabbitmq:3.11-management
RUN apt-get -o Acquire::Check-Date=false -q update && apt-get install -yq curl
RUN curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.11.1/rabbitmq_delayed_message_exchange-3.11.1.ez > $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange.ez &&\
    chown rabbitmq:rabbitmq $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange.ez
RUN rabbitmq-plugins enable rabbitmq_tracing
RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange
