<?php
namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class Security implements EventSubscriberInterface
{
    public static function getSubscribedEvents(){
        return [
            KernelEvents::CONTROLLER => [
                ['descrypter', 0],
            ],
            KernelEvents::RESPONSE => [
                ['encrypter', 0]
            ]
        ];
    }

    public function descryter(ControllerEvent $event){

    }

    public function encryter(ResponseEvent $event){
        
    }
}