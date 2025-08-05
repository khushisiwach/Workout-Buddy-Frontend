# mainPage/context_processors.py

def auth_token(request):
    return {
        'token': request.session.get('token')
    }
