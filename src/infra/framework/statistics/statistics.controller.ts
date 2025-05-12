import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetStatisticsUseCase } from 'src/use-cases/statistics/get-statistics/get-statistics';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private getStatisticsUseCase: GetStatisticsUseCase) { }
    
    @HttpCode(200)
    @Get()
    getStatistics() {
        return this.getStatisticsUseCase.execute();
    }
    
}
