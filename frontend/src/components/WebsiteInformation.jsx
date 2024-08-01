import React from 'react'

function WebsiteInformation() {

      const blogPosts = [
        {
          title: 'Les tendances du marché immobilier 2024',
          excerpt: 'Découvrez les dernières tendances du marché immobilier en 2024...',
          link: '/blog/market-trends-2024',
        },
        {
            title: 'Conseils pour acheter votre première maison',
            excerpt: 'Acheter une maison pour la première fois peut être stressant, voici nos conseils...',
            link: '/blog/first-home-buying-tips',
          },{
            title: 'Conseils pour acheter votre première maison',
            excerpt: 'Acheter une maison pour la première fois peut être stressant, voici nos conseils...',
            link: '/blog/first-home-buying-tips',
          },{
            title: 'Conseils pour acheter votre première maison',
            excerpt: 'Acheter une maison pour la première fois peut être stressant, voici nos conseils...',
            link: '/blog/first-home-buying-tips',
          },{
            title: 'Conseils pour acheter votre première maison',
            excerpt: 'Acheter une maison pour la première fois peut être stressant, voici nos conseils...',
            link: '/blog/first-home-buying-tips',
          },{
            title: 'Conseils pour acheter votre première maison',
            excerpt: 'Acheter une maison pour la première fois peut être stressant, voici nos conseils...',
            link: '/blog/first-home-buying-tips',
          },{
            title: 'Conseils pour acheter votre première maison',
            excerpt: 'Acheter une maison pour la première fois peut être stressant, voici nos conseils...',
            link: '/blog/first-home-buying-tips',
          },{
            title: 'Conseils pour acheter votre première maison',
            excerpt: 'Acheter une maison pour la première fois peut être stressant, voici nos conseils...',
            link: '/blog/first-home-buying-tips',
          },
      ];
      return (
        <div className="container gap-3 mx-auto sm:p-4 flex flex-col items-center">
          <div className="stats stats-vertical sm:w-full lg:w-3/4 w-full   shadow">
     <div className="stat sm:m-5">
    <div className="stat-title">Nos Services</div>
    <div className="lg:tooltip " data-tip="Accédez à une large sélection d'annonces immobilières mises à jour régulièrement."><div className="text-left stat-value md:text-xl text-base ">Consultation d'Annonces Immobilières</div></div>
    <div className="lg:tooltip" data-tip="Utilisez notre barre de recherche multicritères pour trouver des biens selon vos besoins spécifiques (type de bien, localisation, prix, surface, nombre de pièces, etc.)."><div className="text-left stat-value md:text-xl text-base ">Recherche Avancée de Biens Immobiliers</div></div>
    <div className="lg:tooltip" data-tip="Sauvegardez vos annonces préférées pour un accès facile et rapide."><div className="text-left stat-value md:text-xl text-base ">Gestion des Favoris</div></div>
    <div className="lg:tooltip" data-tip="Communiquez directement avec les agents responsables des annonces via notre système de messagerie interne."><div className="text-left stat-value md:text-xl text-base ">Messagerie Sécurisée</div></div>
    <div className="lg:tooltip" data-tip="Créez, modifiez et supprimez vos annonces immobilières via une interface intuitive."><div className="text-left stat-value md:text-xl text-base ">Publication et Gestion d'Annonces pour Agents Immobiliers</div></div>
    <div className="lg:tooltip" data-tip="Consultez les statistiques de vos annonces pour connaître leur performance (vues, contacts, etc.)."><div className="text-left stat-value md:text-xl text-base ">Suivi des Statistiques d'Annonces</div></div>
    <div className="lg:tooltip" data-tip="Bénéficiez d'une assistance technique pour toute question ou problème lié à l'utilisation du site."><div className="text-left stat-value md:text-xl text-base ">Support Technique et Assistance</div></div>
    <div className="lg:tooltip" data-tip="Consultez des descriptions détaillées, des galeries de photos et vidéos, ainsi que des informations supplémentaires sur le quartier et les commodités environnantes."><div className="text-left stat-value md:text-xl text-base ">Accès à des Informations Complètes sur les Biens</div></div>
    
    
  </div>

  <div className='sm:flex '>
  <section className="ring m-4 rounded" >
  <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 -400 dark:-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p className="text-2xl font-medium -900 dark:">"Grâce à ce site, j'ai trouvé la maison de mes rêves en un temps record !"</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://avatar.iran.liara.run/public/boy" alt="profile picture"></img>
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium -900 dark:">User</div>
                  <div className="pl-3 text-sm font-light -500 dark:-400"></div>
              </div>
          </figcaption>
      </figure>
  </div>
</section>

<section className="ring m-4 rounded">
  <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 -400 dark:-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p className="text-2xl font-medium -900 dark:">"Le service est impeccable et les agents sont très professionnels."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://avatar.iran.liara.run/public/boy" alt="profile picture"></img>
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium -900 dark:">User</div>
                  <div className="pl-3 text-sm font-light -500 dark:-400"></div>
              </div>
          </figcaption>
      </figure>
  </div>
</section>
</div>
<div className='sm:flex'>
<section className="ring m-4 sm:w-1/2 rounded">
  <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 -400 dark:-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p className="text-2xl font-medium -900 dark:">"Un large choix d'annonces et une interface très intuitive. Je recommande !"</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://avatar.iran.liara.run/public/boy" alt="profile picture"></img>
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium -900 dark:">User</div>
                  <div className="pl-3 text-sm font-light -500 dark:-400"></div>
              </div>
          </figcaption>
      </figure>
  </div>
</section>

<section className="ring sm:w-1/2 m-4 rounded">
  <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 -400 dark:-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p className="text-2xl font-medium -900 dark:">"Une expérience utilisateur exceptionnelle."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://avatar.iran.liara.run/public/boy" alt="profile picture"></img>
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium -900 dark:">User</div>
                  <div className="pl-3 text-sm font-light -500 dark:-400"></div>
              </div>
          </figcaption>
      </figure>
  </div>
</section>
</div>
<section className="ring m-4 rounded sm:w-3/4 mx-auto">
  <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 -400 dark:-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p className="text-2xl font-medium -900 dark:">"J'ai pu vendre mon appartement rapidement grâce à ce site. Très satisfait "</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://avatar.iran.liara.run/public/boy" alt="profile picture"></img>
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium -900 dark:">User</div>
                  <div className="pl-3 text-sm font-light -500 dark:-400"></div>
              </div>
          </figcaption>
      </figure>
  </div>
</section>


 
</div>
         
<div className="lg:grid  grid-cols-2 md:grid-cols-3 gap-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="card md:my-4 md:mx-auto bg-base-100 w-3/4 lg:w-80  shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="card-actions justify-end">
                <a href={post.link} className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>







        </div>
      );
}

export default WebsiteInformation