# Generated by Django 5.1.2 on 2024-10-20 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_account_online_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='online_status',
        ),
    ]