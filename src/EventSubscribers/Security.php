<?php
namespace App\EventSubscribers;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpFoundation\JsonResponse;
use Nullix\CryptoJsAes\CryptoJsAes;

class Security implements EventSubscriberInterface
{
    private $keyAes;

    public function __construct($public)
    {
        $key = new \SplFileObject($public);
        $this->keyAes = $key->current();
        //$key->seek(1);
        //$this->keyAes = $key->current();
    }

    public static function getSubscribedEvents(){
        return [
            KernelEvents::CONTROLLER => [
                ['decrypter', 0],
            ],
            KernelEvents::RESPONSE => [
                ['encrypter', 0]
            ]
        ];
    }

    public function decrypter(ControllerEvent $event){
        if(key_exists('_controller', $event->getRequest()->attributes->all())){
            if(preg_match("#ApiController#", $event->getRequest()->attributes->all()['_controller'])){
                //$action = explode(":", $event->getRequest()->attributes->all()['_controller'])[2];
                //$contenteType = $event->getRequest()->headers->get('content-type');
                $method = $event->getRequest()->getMethod();
                if($method == "POST"){
                    $content = json_decode($event->getRequest()->getContent())->data;
                    $datas = CryptoJsAes::decrypt($content, $this->keyAes);
                    $event->getRequest()->initialize(
                        $event->getRequest()->query->all(),
                        $event->getRequest()->request->all(),
                        $event->getRequest()->attributes->all(),
                        $event->getRequest()->cookies->all(),
                        $event->getRequest()->files->all(),
                        $event->getRequest()->server->all(),
                        $datas
                    );
                } 
            }
        }
    }

    public function encrypter(ResponseEvent $event){
        if(key_exists('_controller', $event->getRequest()->attributes->all())){
            if(preg_match("#ApiController#", $event->getRequest()->attributes->all()['_controller'])){
                $payloadNotEncoded = $event->getResponse()->getContent();
                $datas = json_decode(CryptoJsAes::encrypt($payloadNotEncoded, $this->keyAes));
                //set Response data
                $event->setResponse(JsonResponse::create($datas));
            }
        }
    }
}