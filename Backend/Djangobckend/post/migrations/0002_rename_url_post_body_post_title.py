# Generated by Django 5.0.4 on 2024-04-26 04:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='URL',
            new_name='body',
        ),
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.CharField(default='TITLE', max_length=200),
        ),
    ]
