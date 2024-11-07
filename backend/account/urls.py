from django.urls import path
from account import views

app_name = "account"

urlpatterns = [
    path('login/', views.loginView),
    path('register/', views.registerView),
    path('refresh-token/', views.CookieTokenRefreshView.as_view()),
    path('logout/', views.logoutView),
    path("user/", views.user),
    path("allusers/",views.allusers),
    path("search/",views.search_users),
    path('userdetails/',views.userDetailView),
    path("user/<int:user_id>/", views.userProfileView),
]