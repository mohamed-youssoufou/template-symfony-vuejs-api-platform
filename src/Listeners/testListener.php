<?php

namespace App\Listeners;

use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpFoundation\Response;

class testListener{

    public function test(ResponseEvent $event)
    {
        $response = new Response();
        $response->setContent('je suis un listener');

        $event->setResponse($response);
        // ...
    }

}