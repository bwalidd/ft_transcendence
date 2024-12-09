from django.urls import path
from account import views

app_name = "account"

urlpatterns = [
    path('login/', views.loginView),
    path('register/', views.registerView),
    path('refresh-token/', views.CookieTokenRefreshView.as_view()),

    path('login42/', views.login_with_42),
    path('callback/', views.callback),
    path('user42/', views.get_user_data),

    path('logout/', views.logoutView),
    path("user/", views.user),
    path("allusers/",views.allusers),
    path("search/",views.search_users),
    path('userdetails/',views.userDetailView),
    path("user/<int:user_id>/", views.userProfileView),
    path('user/update/', views.update_user),
]

