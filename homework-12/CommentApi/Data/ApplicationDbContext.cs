using CommentApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CommentApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Log> Logs { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Comment>().HasData(
                new Comment { Id = 1, Text = "Init", Author = "Александр", Email = "vpiskin335@gmail.com" }
            );
        }
    }
}