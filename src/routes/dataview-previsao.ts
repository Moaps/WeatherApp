import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get('/dataview', async (req, res) => {
  try {
    const today = new Date();
    const fourDaysLater = new Date();
    fourDaysLater.setDate(today.getDate() + 4);

    const previsoes = await prisma.previsao.findMany({
      where: {
        data_log: {
          gte: today,
          lte: fourDaysLater,
        },
      },
      orderBy: {
        data_log: 'asc',
      },
    });

    const formattedData = previsoes.map((entry, index) => {
      // Verificar se entry ou entry.data_log é nulo ou undefined
      if (!entry || !entry.data_log) {
        console.error('Dado invalido:', entry);
        return null; // Ou outra ação apropriada, como pular este item
      }
    
      const dataLogDate = new Date(entry.data_log);
    
      // Verificar se dataLogDate é uma data válida
      if (isNaN(dataLogDate.getTime())) {
        console.error('Data invalida:', entry.data_log);
        return null; // Ou outra ação apropriada, como pular este item
      }
    
      return {
        id: `dia_${index + 1}`,
        dia: format(dataLogDate, 'dd/MM/yyyy'),
        chuva: `Chuva: <strong>${entry.probabilidade_chuva}%</strong>`,
        min_temp: `Min: <strong>${entry.temperatura_min}°C</strong>`,
        max_temp: `Máx: <strong>${entry.temperatura_max}°C</strong>`,
        photo: "../assets/imgs/cloud-sun.svg"
      };
    }).filter(item => item !== null); // Remover itens nulos do array
    
    res.json(formattedData);
    
  } catch (error) {
    res.status(500).json({ error: 'Erro ao recuperar dados'});
  }
});

export default router;
