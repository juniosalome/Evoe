from django.db import models

# Create your models here.
class Produto(models.Model):

    chave = models.CharField(max_length=13,help_text="Entrar com chave")    
    nome = models.CharField(max_length=200, help_text="Entrar com nome")
    decricao = models.TextField(help_text="Entrar com descricao")
    

    def get_absolute_url(self):
         """
         Retorno da url instancia do Produto.
         """
         return reverse('produto-detalhe-view', args=[str(self.id)])
    
    def __str__(self):
        
        return self.chave
