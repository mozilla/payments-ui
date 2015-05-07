FROM busybox

COPY public /srv/payments-ui
VOLUME /srv/payments-ui
CMD ["true"]
