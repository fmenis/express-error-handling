
# Notes

- it's important to log everything goes outside and insiede the system (database query and results, http requests and response to another service, etc)
- it's important to log the request and the response of an http transaction
- use debug level to solve situations that can't be solved with less verbose logging levels
- it's important that the logs have a format that can be parsable (by log managment tools) and searchable
- good format: timestamp, user, ip, error stack trace
- what to lo depends to the application. if we want to understand why we get a certain situation, out loggin will be called "tracing"
- no log personal data!
- logs must be ordered decreasing numerical order (from minir to major), and increasing proprity
- logs must be structures to be analyzed
- user child loggers to add context of the request
- morgan is used to help log request

## Logging levels
Syslog
- emerg
- alert
- critical
- error
- warning
- notice 
- info
- debug