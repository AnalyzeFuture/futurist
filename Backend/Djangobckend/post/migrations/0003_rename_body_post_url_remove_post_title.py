# Generated by Django 5.0.4 on 2024-04-26 04:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_rename_url_post_body_post_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='body',
            new_name='url',
        ),
        migrations.RemoveField(
            model_name='post',
            name='title',
        ),
    ]
