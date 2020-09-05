<?php

namespace App\Controller;

use App\Service\EndPoints;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}
