<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/{vueRouting}", name="index", requirements={"vueRouting"="^(?!api|_(profiler|wdt)).*"})
     */
    public function index()
    {
        return $this->render('base.html.twig', []);
    }
}
