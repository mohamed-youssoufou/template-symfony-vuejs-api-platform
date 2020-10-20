<?php

namespace App\Controller;

use App\Service\EndPoints;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\FOSRestBundle;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api")
 */
class ApiController extends FOSRestBundle
{

    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    /**
     * @Rest\Post("/users")
     * @Rest\View
     */
    public function index(Request $request)
    {
        
        $data = json_decode($request->getContent());
        
        $response = $this->client->request('POST', EndPoints::LDAP_LOGIN, [
            'verify_peer' => 'false',
            'verify_host' => 'false',
            'json' => [
                'data'=> [
                    "login" => $data->login,
                    "password" => $data->passwd
                ]
            ]
        ]);
        return $response->toArray();
    }

    /**
     * @Rest\Get("/todos")
     * @Rest\View
     */
    public function todolist(){
        return $this->client->request('GET', EndPoints::JSON_PLACEHOLDER."todos")->toArray();
    }

    /**
     * @Rest\Get("/todo/{id}", requirements={"id" = "\d+"}, defaults={"id" = 1})
     * @Rest\View
     */
    public function getTodoListByCirteria($id){
        return $this->client->request('GET', EndPoints::JSON_PLACEHOLDER."todos/".$id)->toArray();
    }


}
