import requests
import random
import randomname

pageSize = 100

def generate_moroccan_phone_number():
    country_code = "212"
    first_digit = "6"
    remaining_digits = "".join([str(random.randint(0, 9)) for _ in range(8)])
    phone_number = f"{country_code} {first_digit}{remaining_digits}"
    return phone_number

def createAccount(FirstName,LastName,email,tel):
    url = 'https://backend-hgsc.onrender.com/api/auth/signup'
    payload = {
            "FirstName": FirstName,
            "LastName": LastName,
            "username": email,
            "email": email,
            "password": email,
            "confirmPassword": email,
            "tel": tel,
            "role": "agent"
            }
    r = requests.post(url , json=payload)
    print('Account Created :'+str(r))
    return r.json()['token']


import random
import requests

def postAd(token, adresse, description, diagnostic, equipment, pcs, pictures, price, surface, title):
    url = 'https://backend-hgsc.onrender.com/api/user/advertisment'
    types = ['achat', 'vente', 'location', 'autre']
    print(token)
    # Data payload to be sent in the POST request
    data = {
        "title": title,
        "description": description,
        "price": price,
        "surface": surface,
        "pcs": pcs,
        "type": random.choice(types),
        "adresse": adresse,
        "pictures": pictures,
        "diagnostic": diagnostic,
        "equipment": equipment,
        "Publish": "published"
    }
    
    # Headers including the authorization token
    headers = {'token': token}
    
    try:
        # Send the POST request
        response = requests.post(url, json=data, headers=headers)
        
        # Raise an HTTPError if the response status code indicates an error
        response.raise_for_status()
        
        # Log or return the response content if the request was successful
        print(f"Ad posted successfully! Server response: {response.json()}")
        return response.json()

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")

# Sample usage of the function:
# postAd('your_token_here', 'address', 'description', 'diagnostic', 'equipment', 3, 'image_url', 1000, 120, 'Ad Title')

def adlisting(lastScroll):
    if(lastScroll == None):
        startNewScroll = True
        lastScroll = ''
    else :
        startNewScroll = False
    url = 'https://gateway.avito.ma/graphql'
    headers = {
        'x-apollo-operation-id': 'c2110f6efba2c1473c4a6219e9709420a22e8b349dfcc49e956c7fbc33e6c4a8',
        'x-apollo-operation-name': 'GetListingPremiumAds',
        'accept': 'multipart/mixed; deferSpec=20220824, application/json',
        'user-session-id': '0cc810f30603938475d5b93c4467e80f',
        'accept-language': 'ar',
        'user-agent': 'Avito/9.2.0 (se.scmv.morocco; build:1463; Android 9; Model:ASUS_I005DA)',
        'content-type': 'application/json'
    }
    data = {
    "operationName": "GetListingPremiumAds",
    "query": "query GetListingPremiumAds($categoryId: Int!, $hasImage: Boolean!, $hasPrice: Boolean!, $text: String, $type: AdTypeKey, $price: RangeFilter, $location: AdLocationFilter, $offersShipping: Boolean, $isHotDeal: Boolean, $isUrgent: Boolean, $isEcommerce: Boolean, $isImmoneuf: Boolean, $params: ListingAdParamsFilters, $pageSize: Int!, $startNewScroll: Boolean!, $latestScrollID: String, $adProperty: AdSortProperty!, $sortOrder: SortOrder!) { getListingAds(query: { filters: { ad: { text: $text categoryId: $categoryId hasImage: $hasImage hasPrice: $hasPrice type: $type price: $price location: $location offersShipping: $offersShipping isHotDeal: $isHotDeal isUrgent: $isUrgent isEcommerce: $isEcommerce isImmoneuf: $isImmoneuf isPremium: true params: $params }  }  sort: { adProperty: $adProperty sortOrder: $sortOrder }  page: { size: $pageSize number: 0 }  metadata: { startNewScroll: $startNewScroll latestScrollID: $latestScrollID }  } ) { ads { details { __typename ... on PublishedAd { __typename listId title price { withCurrency } media { media { images { paths { standard } } } } category { name } location { city { id name } } listTime ...PublishedAdParam isPremium } } metadata { nextScrollId } } } }  fragment adParam on AdParam { __typename ... on TextAdParam { id name textValue trackingValue } ... on NumericAdParam { id name numericValue unit } ... on BooleanAdParam { id name booleanValue } }  fragment PublishedAdParam on PublishedAd { params { primary { __typename ...adParam } secondary { __typename ...adParam } extra { __typename ...adParam } } }",
    "variables": {
        "adProperty": "LIST_TIME",
        "categoryId": 1000,
        "hasImage": False,
        "hasPrice": False,
        "isHotDeal": False,
        "isUrgent": False,
        "latestScrollID": lastScroll,
        "pageSize": pageSize,
        "sortOrder": "DESC",
        "startNewScroll": startNewScroll
        }
    }
    response = requests.post(url , json=data , headers=headers).json()
    print(response)
    for ad in response['data']['getListingAds']['ads']['details']:
        if True:
            name1 = randomname.get_name()
            name2 = randomname.get_name()
            phone = generate_moroccan_phone_number()
            Apictures =ad['media']['media']['images']
            pics = []
            for pic in Apictures:
                pics.append(pic['paths']['standard'])
            token = createAccount(name1,name2,name1+'@'+name2+'.com',phone)
            postAd(token, ad['location']['city']['name'], ad['title'], ad['title'], ad['title'], random.randrange(1,100), pics, random.randint(1000, 1000000), random.randint(50, 500), ad['title'])
        
    adlisting(response['data']['getListingAds']['ads']['metadata']['nextScrollId'])
#adlisting(None)
def adEnable():
    response = requests.get('https://backend-hgsc.onrender.com/api/admin/advertisments?offset=1&title=&enabled=1&price=&surface=&type=&adresse=&createdBy=&createdAt=&seen=',headers={"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MDA3ZjM5MGNjNmVlMDczNjBlODIiLCJpYXQiOjE3MjYyODQwMDAsImV4cCI6MTcyNzU4MDAwMH0.sIHpRwJ1Zts-Z9skjLHvC0V9bVU9keFc69_xmo-ERYQ"}).json()
    for ad in response:
        if ad['enabled'] == False:
            print(requests.post('https://backend-hgsc.onrender.com/api/admin/activateAd/'+ad['_id'],json={"enabled": "true"},headers={"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MDA3ZjM5MGNjNmVlMDczNjBlODIiLCJpYXQiOjE3MjYyODQwMDAsImV4cCI6MTcyNzU4MDAwMH0.sIHpRwJ1Zts-Z9skjLHvC0V9bVU9keFc69_xmo-ERYQ"}).text)
    adEnable()
adEnable()