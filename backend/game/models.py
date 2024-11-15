from django.db import models

class Player(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    color = models.CharField(max_length=20)
    score = models.IntegerField()

class Computer(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    color = models.CharField(max_length=20)
    score = models.IntegerField()