'use client';

import { Label, Pie, PieChart, Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getData } from '@/lib/actions';
import { useEffect, useState } from 'react';
import { generateColor } from '@/lib/utils';

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig


export default function Statiscics() {
  const [total, setTotal] = useState(0);
  const [qtyItems, setQtyItems] = useState([]);

  useEffect(() => {
    const getChartsData = async () => {
      const data = await getData();

      const result = data.reduce((acc, curr) => {
        if (acc[curr.Product]) {
          acc[curr.Product].Qty += curr.Qty;
          acc[curr.Product].Value += curr.Value;
        } else {
          acc[curr.Product] = curr;
        }

        return acc;
      }, {});

      const fixedItems = Object.values(result).map((item, idx) => {
        return {
          product: item.Product,
          qty: item.Qty,
          fill: generateColor(),
          price: (item.Value / item.Qty).toFixed(2)
        };
      });

      setTotal(fixedItems.reduce((acc, cur) => (acc += cur.qty), 0));
      setQtyItems(fixedItems);
    };

    getChartsData();
  }, []);

  return (
    <div>
      <Card className='m-10'>
        <CardHeader className='items-center pb-0'>
          <CardTitle>Quantity</CardTitle>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[250px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={qtyItems}
                dataKey='qty'
                nameKey='product'
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor='middle'
                          dominantBaseline='middle'
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className='fill-foreground text-3xl font-bold'
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className='fill-muted-foreground'
                          >
                            total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className='m-10'>
        <CardHeader className='items-center pb-0'>
          <CardTitle>Avg. price</CardTitle>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={qtyItems}
              layout='vertical'
            >
              <YAxis
                dataKey='product'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
          
              />
              <XAxis dataKey='price' type='number' domain={[0, 300]} hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey='price' layout='vertical' radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
