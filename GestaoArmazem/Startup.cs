﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Armazens;
using DDDSample1.Infrastructure.Entregas;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;
using DDDSample1.Middlewares.Authorization;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>{
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors("MyPolicy");

            app.UseMiddleware<JwtMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<MySQLSchema>();

            services.AddTransient<IArmazemRepositorio,ArmazemRepositorio>();
            services.AddTransient<ServicoArmazem>();

            services.AddTransient<IEntregaRepositorio,EntregaRepositorio>();
            services.AddTransient<ServicoEntrega>();
        }
    }
}