FROM cogniteev/echo

COPY public /srv/payments-ui
COPY .git/FETCH_HEAD /srv/payments-ui/git-rev.txt
VOLUME /srv/payments-ui
