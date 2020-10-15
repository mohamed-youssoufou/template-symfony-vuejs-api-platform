<?php 

namespace App\Listeners;

use Symfony\Component\HttpClient\Exception\TransportException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HttpExceptionListener{

    public function __invoke(ExceptionEvent $event){

        $exception = $event->getException();

        if(!($exception instanceof TransportException) || strpos($event->getRequest()->getRequestUri(), 'api') == false){
            return ;
        }

        $body = [
                    ["status" => 
                        [
                            "code" => "500",
                            "message"=> $exception->getMessage()
                        ]
                    ], 
                    "hasError" => false
                ];

        $response = new JsonResponse($body);
        $response->setStatusCode($exception->getCode());
        $event->setResponse($response);
    }

}