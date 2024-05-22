import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

// Get weather forecast for today and the next 4 days
router.get('/previsao', async (req, res) => {
  try {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // calcula datas de 4 dias a partir de hoje (grafico de 5 dias)
    const nextFourDays = new Date();
    nextFourDays.setDate(today.getDate() + 4);
    nextFourDays.setHours(23, 59, 59, 999); // configura tempo no fim do dia

    // recupera a previsao de hoje e dos proximos 4 dias
    const forecast = await prisma.previsao.findMany({
      where: {
        data_log: {
          gte: today,
          lte: nextFourDays,
        },
      },
      orderBy: {
        data_log: 'asc',
      },
      select: {
        data_log: true,
        temperatura_min: true,
        temperatura_max: true,
        probabilidade_chuva: true,
        precipitacao_max: true,
      },
    });

    // formatacao json
    const formattedData = forecast.map((entry) => ({
      dia: entry.data_log ? format(new Date(entry.data_log), 'dd/MM') : 'N/A',
      chuva: entry.probabilidade_chuva ?? 0,
      temperatura: entry.temperatura_max ?? 0,
    }));

    res.json(formattedData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Erro ao recuperar previsão: ' + error.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
});

export default router;
